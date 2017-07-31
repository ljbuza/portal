import React, { Component } from 'react';
import {
  Input,
  Menu,
  Checkbox,
} from 'semantic-ui-react';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  render() {
    return (
      <div className="ui basic segment">
        <Menu compact text vertical>
          <Menu.Item>
            <Input icon="search" size="mini" placeholder="Search Map..." />
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Layers</Menu.Header>
            <Menu.Menu>
              <Menu.Item name="Node Boundaries">
                <Checkbox label="Node Boundaries" />
              </Menu.Item>
              <Menu.Item name="Cables">
                <Checkbox label="Cables" />
              </Menu.Item>
              <Menu.Item name="Modems">
                <Checkbox label="Modems" />
              </Menu.Item>
              <Menu.Item name="CMTS">
                <Checkbox label="CMTS" />
              </Menu.Item>
              <Menu.Item name="Headend">
                <Checkbox label="Headend" />
              </Menu.Item>
              <Menu.Item name="Capacity">
                <Checkbox label="Capacity" />
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
