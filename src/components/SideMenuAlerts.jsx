import React, { Component } from 'react';
import {
  Form,
  Modal,
  Menu,
  Label,
  Button,
} from 'semantic-ui-react';
import Picker from './Picker';

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
            <Menu.Header>View Filters</Menu.Header>
            <Menu.Menu>
              <Modal
                dimmer="blurring"
                trigger={
                  <Menu.Item name="alerts">
                    <Label color="blue">1</Label>Alerts
                  </Menu.Item>
                }
              >
                <Modal.Header>Alert Filters</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Select
                      label="Status"
                      multiple
                      options={[
                        { key: 'cmts-1', text: 'red', value: 'cmts-1' },
                        { key: 'cmts-2', text: 'yellow', value: 'cmts-2' },
                        { key: 'cmts-2', text: 'green', value: 'cmts-2' },
                      ]}
                      placeholder="Status"
                    />
                    <Form.Select
                      label="Equipment"
                      multiple
                      options={[
                        { key: 'alcatel', text: 'CMTS-1', value: 'alcatel' },
                        { key: 'arris', text: 'CMTS-2', value: 'arris' },
                      ]}
                      placeholder="Equipment"
                    />
                    <Form.Select
                      label="Field"
                      multiple
                      options={[
                        { key: '1.0', text: 'Port Capacity', value: '1.0' },
                      ]}
                      placeholder="Field"
                    />
                    <label>Last Updated</label>
                    <Picker />
                    <label>Value</label>
                    <Picker />
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    positive
                    size="small"
                    icon="checkmark"
                    labelPosition="right"
                    content="Apply"
                    onClick={this.close}
                  />
                </Modal.Actions>
              </Modal>
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Favorite Filters</Menu.Header>
            <Menu.Menu>
              <Menu.Item name="offline report" />
              <Menu.Item name="bend cable modems" />
              <Menu.Item name="max power" />
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Shared Filters</Menu.Header>
            <Menu.Menu>
              <Menu.Item name="high SNR" />
              <Menu.Item name="high flaps" />
              <Menu.Item name="un-provisioned subscriber" />
              <Menu.Item icon="add circle" name="add more" />
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
