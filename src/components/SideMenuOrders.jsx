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
                  <Menu.Item name="orders">
                    <Label color="blue">1</Label>Orders
                  </Menu.Item>
                }
              >
                <Modal.Header>Order Filters</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Select
                      label="BxE Order"
                      multiple
                      options={[
                        { key: 'cmts-1', text: '123', value: 'cmts-1' },
                        { key: 'cmts-2', text: '456', value: 'cmts-2' },
                      ]}
                      placeholder="BxE Order"
                    />
                    <Form.Select
                      label="BSS Order"
                      multiple
                      options={[
                        { key: 'alcatel', text: 'ABC', value: 'alcatel' },
                        { key: 'arris', text: 'DEF', value: 'arris' },
                      ]}
                      placeholder="BSS Order"
                    />
                    <Form.Select
                      label="Order Status"
                      multiple
                      options={[
                        { key: '1.0', text: 'In Progress', value: '1.0' },
                        { key: '2.0', text: 'Complete', value: '2.0' },
                        { key: '3.0', text: 'Problem', value: '2.0' },
                      ]}
                      placeholder="Order Status"
                    />
                    <Form.Select
                      label="Provisioned?"
                      multiple
                      options={[
                        { key: '1.0', text: 'Yes', value: '1.0' },
                        { key: '2.0', text: 'No', value: '2.0' },
                      ]}
                      placeholder="Provisioned?"
                    />
                    <label>Modified</label>
                    <Picker />
                    <label>Created</label>
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
