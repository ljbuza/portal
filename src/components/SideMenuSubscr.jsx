import React, { Component } from 'react';
import {
  Form,
  Modal,
  Menu,
  Label,
  Button,
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
            <Menu.Header>View Filters</Menu.Header>
            <Menu.Menu>
              <Modal
                dimmer="blurring"
                trigger={
                  <Menu.Item name="subscribers">
                    <Label color="blue">3</Label>Subscribers
                  </Menu.Item>
                }
              >
                <Modal.Header>Subscriber Filters</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Select
                      label="Name"
                      multiple
                      options={[
                        { key: 'cmts-1', text: 'Noal Miles', value: 'cmts-1' },
                        { key: 'cmts-2', text: 'John Smith', value: 'cmts-2' },
                        {
                          key: 'cmts-3',
                          text: 'Mary Anderson',
                          value: 'cmts-3',
                        },
                        { key: 'cmts-4', text: 'Howard Jones', value: 'cmts-4' },
                      ]}
                      placeholder="Name"
                    />
                    <Form.Select
                      label="Billing Acct"
                      multiple
                      options={[
                        { key: 'alcatel', text: '123A321', value: 'alcatel' },
                        { key: 'arris', text: '543B234', value: 'arris' },
                      ]}
                      placeholder="Billing Acct"
                    />
                    <Form.Select
                      label="Address"
                      multiple
                      options={[
                        { key: '1.0', text: '123 Main St.', value: '1.0' },
                        { key: '2.0', text: '532 Crosstown Rd.', value: '2.0' },
                        { key: '3.0', text: '123 Maple St.', value: '2.0' },
                        { key: '4.0', text: '123 Hemlock Ave.', value: '2.0' },
                      ]}
                      placeholder="Address"
                    />
                    <Form.Select
                      label="City"
                      multiple
                      options={[
                        { key: '1.0', text: 'Madison', value: '1.0' },
                        { key: '2.0', text: 'Sun Prairie', value: '2.0' },
                        { key: '3.0', text: 'Waunakee', value: '2.0' },
                      ]}
                      placeholder="City"
                    />
                    <Form.Select
                      label="State"
                      multiple
                      options={[{ key: '1.0', text: 'WI', value: '1.0' }]}
                      placeholder="State"
                    />
                    <Form.Select
                      label="Zip"
                      multiple
                      options={[
                        { key: '1.0', text: '52343', value: '1.0' },
                        { key: '2.0', text: '53528', value: '1.0' },
                      ]}
                      placeholder="Zip"
                    />

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
