/**
@file communicating to the django auth package
@author Russell Little <Russell.Little@tdstelecom.com>
@version 0.1
**/

function getCookie(cookie) {
  /** Get a cookie from the window
  @param {string} cookie - The name of the cookie
  @ returns {string} cookie - the value of the cookie or undefined
  **/
  var name = cookie + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
}
function deleteCookie(cookie) {
  /** Get a cookie from the window
  @param {string} cookie - The name of the cookie
  @returns {undefined}
  **/
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

var cookies = {
  /** a mapping of cookies provided by the server. these probably 
    shouldn't change
  **/
  username: "usr",
  groups: "groups",
  csrftoken: "csrftoken",
  idletimeout: "idletimeout",
  warnafter: "warnafter"
};

export default class BxePortalAuth {
  /**instance maintaining the state of the authentication.
    wrapping up the cookies and providing an authentication api
    
    @param {url} host - required, the host of the django auth server 
    @param {callback} onExpire - if the session expires due to inactivity
      this fires
    @param {callback} onLogout - if this session ends through logout this fires
    @param {callback} warn - if this session is near to logging out, this fires
    @param {url} login - endpoint to hit to login default = ""
    @param {url} logout - endpoint to hit to logout default = "logout/"
    @param {url} ping - endpoint to hit to assess server status 
      default= "security_session/ping/"
    @param {url} touch - endpoint to hit to update the server
      default = "touch/" 
    @param {array of strings} events - window events that count as activity
      default = ["mousemove", "mousewheel", "mousedown", "keypress", "scroll"]
    @param {string} checkExpireInterval - how often to check server status 
      default = 1000
    @param {string} maxServerUpdates - minimum interval between
      hitting the server to update user activity

  **/
  constructor({
    host,
    onExpire,
    onLogout,
    warn,
    login = "/",
    logout = "logout/",
    ping = "session_security/ping/",
    touch = "touch/",
    events = ["mousemove", "mousewheel", "mousedown", "keypress", "scroll"],
    checkExpireInterval = 1000,
    maxServerUpdates = 1000
  }) {
    console.assert(host, "host is required, should point to the api host");
    this.host = host;
    this.loginurl = login;
    this.logouturl = logout;
    this.touchurl = touch;
    this.pingurl = ping;
    this.maxServerUpdates = maxServerUpdates;
    this.events = events;

    // the auth cookies should exist on page load
    // if you're not logged in the login function will redirect you
    this.username = getCookie(cookies["username"]);

    var groupsCookie = getCookie(cookies["groups"]);
    try {
      this.groups = groupsCookie
        .substring(2, groupsCookie.length - 1)
        .split("<SPLITKEY>");
    } catch (err) {
      this.groups = undefined;
    }

    this.expire = parseInt(getCookie(cookies["idletimeout"]));
    this.warnafter = parseInt(getCookie(cookies["warnafter"]));

    // add custom handlers for expiring and logout
    addEventListener("expiringsoon", warn);
    addEventListener("expire", onExpire);
    addEventListener("logout", onLogout);

    // only if we are logged in ping the server
    if (this.username) {
      // console.log("starting up check interval and event listeners");
      // add the event listeners to update last activity on user action
      for (var i = 0; i < events.length; i++) {
        addEventListener(events[i], () => {
          this.touchServer();
        });
      }
      // check every second to see if we should expire
      this.expireInterval = setInterval(
        this.checkExpire.bind(this),
        checkExpireInterval
      );
    }
    console.log(this);
  }
  /** redirect us to the login url, which will redirect
        you back to landingpath with all the cookeis you need
    **/
  login(landingpath = "") {
    console.log("logging into", this.host + this.loginurl + landingpath);
    window.location = this.host + this.loginurl + landingpath;
  }

  /** just hit the logout endpoint and set this loggedin state to false
    **/
  logout() {
    console.log("logging out at", this.host + this.logouturl);
    fetch(this.host + this.logouturl, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": getCookie("csrftoken")
      }
    }).then(response => {
      if (response.ok) {
        clearInterval(this.expireInterval);

        for (var i = 0; i < this.events.length; i++) {
          removeEventListener(this.events[i], this.touchServer);
        }

        dispatchEvent(new Event("logout")); // hook in users logout handler

        deleteCookie(cookies["username"]); // delete the usr cookie holding name
        this.username = undefined; // delete the username wrapper
        deleteCookie(cookies["groups"]);
        this.groups = undefined; // our parsed groups
        deleteCookie(cookies["idletimeout"]);
        deleteCookie(cookies["warnafter"]);
      } else {
        console.log("logout failed", response);
      }
      return response;
    });
  }
  checkExpire() {
    // console.log("checking server idle time");
    var caller = this;
    fetch(this.host + this.pingurl, {
      method: "get",
      credentials: "include"
    })
      .then(response => {
        response.text().then(data => {
          // console.log("response=> ", data);
          if (data === '"logout"') {
            caller.logout();
          } else {
            var idlefor = parseInt(data, 10);
            console.log("last activity", idlefor, "seconds ago");
            if (idlefor > caller.expire) {
              // console.log("EXPIRED!!");
              caller.expired = true;
              dispatchEvent(new Event("expire"));
              this.logout();
            } else if (idlefor > caller.warnafter) {
              this.expired = false;
              // console.log("Expiring Soon!!");
              dispatchEvent(new Event("expiringsoon"));
            } else {
              this.expired = false;
            }
          }
        });
      })
      .catch(err => {
        console.warn("network err!", err);
      });
  }
  touchServer() {
    if (!this.username) return; // if not logged in nothing to update
    // throttle updates to 1/second
    if (new Date() - this.lastactivity < this.maxServerUpdates) {
      return;
    }
    this.lastactivity = new Date();

    // console.log("updating server of activity");
    this.lastactivity = new Date();
    fetch(this.host + this.touchurl, {
      method: "get",
      credentials: "include"
    }).then(response => {
      // console.log("touch server => ", response.ok);
    });
  }
}
