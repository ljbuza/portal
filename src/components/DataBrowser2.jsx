import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import SideMenu from './SideMenu';
import NetworkSecMenu from './NetworkSecMenu';
import EquipSecMenu from './EquipSecMenu';
import NetworkCmts from './NetworkCmts';
import NetworkMac from './NetworkMac';
import NetworkFiber from './NetworkFiber';
import NetworkCface from './NetworkCface';
import NetworkModem from './NetworkModem';
import NetworkMface from './NetworkMface';
import EquipCmts from './EquipCmts';
import EquipModem from './EquipModem';
import EquipMta from './EquipMta';
import Subscriber from './Subscriber';
import SubSecMenu from './SubSecMenu';
import SubscriberOverview from './SubscriberOverview';
import Order from './Order';
import Foo from './Foo';

import '../../public/css/main.css';
import '../../node_modules/semantic-ui-css/semantic.min.css';

const routes = [
  {
    path: '/databrowser',
    exact: true,
    header: () => (
      <Header title="Data Browser" subtitle="Network Information" />
    ),
    secondarymenu: () => <NetworkSecMenu />,
    main: () => <div><NetworkCmts /></div>,
  },
  {
    path: '/databrowser/network-cmts',
    header: () => (
      <Header title="Data Browser" subtitle="Network Information" />
    ),
    secondarymenu: () => <NetworkSecMenu />,
    main: () => <div><NetworkCmts /></div>,
  },
  {
    path: '/databrowser/network-mac',
    header: () => (
      <Header title="Data Browser" subtitle="Network Information" />
    ),
    secondarymenu: () => <NetworkSecMenu />,
    main: () => <div><NetworkMac /></div>,
  },
  {
    path: '/databrowser/network-fiber',
    header: () => (
      <Header title="Data Browser" subtitle="Network Information" />
    ),
    secondarymenu: () => <NetworkSecMenu />,
    main: () => <div><NetworkFiber /></div>,
  },
  {
    path: '/databrowser/network-cface',
    header: () => (
      <Header title="Data Browser" subtitle="Network Information" />
    ),
    secondarymenu: () => <NetworkSecMenu />,
    main: () => <div><NetworkCface /></div>,
  },
  {
    path: '/databrowser/network-modem',
    header: () => (
      <Header title="Data Browser" subtitle="Network Information" />
    ),
    secondarymenu: () => <NetworkSecMenu />,
    main: () => <div><NetworkModem /></div>,
  },
  {
    path: '/databrowser/network-mface',
    header: () => (
      <Header title="Data Browser" subtitle="Network Information" />
    ),
    secondarymenu: () => <NetworkSecMenu />,
    main: () => <div><NetworkMface /></div>,
  },

  {
    path: '/databrowser/equip-cmts',
    header: () => (
      <Header title="Data Browser" subtitle="Equipment Information" />
    ),
    secondarymenu: () => <EquipSecMenu />,
    main: () => <div><EquipCmts /></div>,
  },
  {
    path: '/databrowser/subscriber',
    exact: true,
    header: () => (
      <Header title="Data Browser" subtitle="Subscriber Information" />
    ),
    secondarymenu: () => <SubSecMenu />,
    main: () => <div><Subscriber /></div>,
  },
];

const Browser2 = ({ match }) => (
  <div>
    <h3>{match.params.section}</h3>
  </div>
);

class Browser extends Component {
  render() {
    const section = this.props.match.params.section;
    return (
      <div>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.header}
          />
        ))}
        <div className="ui container" id="main_body">
          <h3>{section}</h3>
          <Route path="/databrowser/subscriber" component={Subscriber} />
        </div>
      </div>
    );
  }
}

const DataBrowser = ({ match }) => (
  <div>
    <Route path={`${match.url}/:section`} component={Browser} />
  </div>
);
export default DataBrowser;
