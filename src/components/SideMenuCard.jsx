import React, { Component } from 'react';
import SideMenu from './SideMenu';
import SecondaryMenu from './SecondaryMenu';

export default class SideMenuCard extends Component {
  render() {
    return (
      <div className="ui container" id="main_body">
        <SecondaryMenu section={this.props.location.pathname} />
        <div className="ui two column grid">
          <div className="stretched row">
            <div className="three wide column">
              <SideMenu />
            </div>
            <div className="thirteen wide column">
              <div className="ui vertical basic segment">
                {/* {this.props.content}*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
