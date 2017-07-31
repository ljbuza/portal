import React, { Component } from 'react';
import { Sidebar, Segment, Menu, Item, Button, Header } from 'semantic-ui-react';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    }
  }
  
  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state
    return (
      <div>
        <Button onClick={this.toggleVisibility}>toggle</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="push" visible={visible} vertical>
            <Item>
              <Header as="small">Favorite Filters</Header>
              <Menu.Item name="Offline Report">Offline Report</Menu.Item>
              <Menu.Item name="Bend Cable Modems">Bend Cable Modems</Menu.Item>
              <Menu.Item name="Max Power">Max Power></Menu.Item>
            </Item>
            <Item>
              <Header as="small">Shared Filters</Header>
              <Menu.Item>High SNR</Menu.Item>
              <Menu.Item>High Flaps</Menu.Item>
              <Menu.Item>Unprovisioned Subscriber</Menu.Item>
              <Menu.Item>Add more</Menu.Item>
              <a className="item" target="_top" href="shared_filters.html"><i className="add circle icon" />Add more</a>
            </Item>
          </Sidebar>
        </Sidebar.Pushable>
      </div>
    );
  }
}
