import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// IndexRedirect, browserHistory
import Dashboard from './components/Dashboard';
import DataBrowser from './components/DataBrowser';

import DocsisMaintenance from './docsisComponents/DocsisMaintenance';
import BxePortalAuth from './tds-js-auth/BxePortalAuth';
import TopFixedMenu from './components/TopFixedMenu';
import D3 from './d3Components/d3';
import '../public/css/main.css';
import '../node_modules/semantic-ui-css/semantic.min.css';
import DataBrowserStore from './stores/DataBrowserStore';
import DevTools from 'mobx-react-devtools'


window.bxeauth = new BxePortalAuth({
  login: '',
  logout: 'logout/',
  ping: 'session_security/ping/',
  // ping: "test/",
  host: 'http://rlittle.tds.local:8000/',
});
if (!window.bxeauth.username) {
  // window.bxeauth.login();
}

const App = () => (
  <Router>
    <div className="App">
      <TopFixedMenu />
      <DevTools />
      <div>
        <Route path="/dashboard" exact component={Dashboard} />
        <Route
          path="/databrowser"
          render={props => <DataBrowser store={DataBrowserStore} />}
        />
        <Route path="/docsismaintenance" component={DocsisMaintenance} />
        <Route path="/d3" component={D3} />
      </div>
    </div>
  </Router>
);
export default App;
