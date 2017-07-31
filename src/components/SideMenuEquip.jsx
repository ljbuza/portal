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
                  <Menu.Item name="cmts">
                    <Label color="blue">1</Label>CMTS
                  </Menu.Item>
                }
              >
                <Modal.Header>CMTS Filters</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Select
                      label="CMTS Name"
                      multiple
                      options={[
                        { key: 'cmts-1', text: 'CMTS-1', value: 'cmts-1' },
                        { key: 'cmts-2', text: 'CMTS-2', value: 'cmts-2' },
                        { key: 'cmts-3', text: 'CMTS-3', value: 'cmts-3' },
                        { key: 'cmts-4', text: 'CMTS-4', value: 'cmts-4' },
                      ]}
                      placeholder="CMTS Name"
                    />
                    <Form.Select
                      label="IP Address"
                      multiple
                      options={[
                        { key: '1', text: '12.32.54.658', value: 'alcatel' },
                        { key: '2', text: '123.4r.54.65', value: 'alcatel' },
                      ]}
                      placeholder="IP Address"
                    />
                    <Form.Select
                      label="Model"
                      multiple
                      options={[
                        { key: '1', text: 'Alcatel', value: 'alcatel' },
                        { key: '2', text: 'Cirrus', value: 'alcatel' },
                      ]}
                      placeholder="Model"
                    />

                    <Form.Select
                      label="Software Version"
                      multiple
                      options={[
                        { key: '1.0', text: '1.0', value: '1.0' },
                        { key: '2.0', text: '2.0', value: '2.0' },
                      ]}
                      placeholder="Software Version"
                    />
                    <label>CPU</label>
                    <Picker />
                    <label>Memory</label>
                    <Picker />
                    <label>Temp</label>
                    <Picker />
                    <label>Uptime</label>
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

              <Modal
                dimmer="blurring"
                trigger={
                  <Menu.Item name="modem">
                    Modem
                  </Menu.Item>
                }
              >
                <Modal.Header>Modem Filters</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Select
                      label="Modem"
                      multiple
                      options={[
                        { key: 'modem-1', text: 'Modem-1', value: 'modem-1' },
                        { key: 'modem-2', text: 'Modem-2', value: 'modem-2' },
                        { key: 'modem-3', text: 'Modem-3', value: 'modem-3' },
                        { key: 'modem-4', text: 'Modem-4', value: 'modem-4' },
                        { key: 'modem-5', text: 'Modem-5', value: 'modem-5' },
                      ]}
                      placeholder="Modem"
                    />
                    <Form.Select
                      label="MAC"
                      multiple
                      options={[
                        { key: 'md-1', text: 'MAC-1', value: 'md-1' },
                        { key: 'md-2', text: 'MAC-2', value: 'md-2' },
                        { key: 'md-3', text: 'MAC-3', value: 'md-3' },
                        { key: 'md-4', text: 'MAC-4', value: 'md-4' },
                      ]}
                      placeholder="MAC"
                    />
                    <Form.Select
                      label="Model"
                      multiple
                      options={[
                        { key: 'md-1', text: 'Surfboard', value: 'md-1' },
                        { key: 'md-2', text: 'X11', value: 'md-2' },
                      ]}
                      placeholder="Model"
                    />

                    <Form.Select
                      label="Vendor"
                      multiple
                      options={[
                        { key: 'fiber-1', text: 'Alcatel', value: 'fiber-1' },
                        { key: 'fiber-2', text: 'Cirrus', value: 'fiber-2' },
                        { key: 'fiber-3', text: 'Netgear', value: 'fiber-3' },
                      ]}
                      placeholder="Vendor"
                    />
                    <Form.Select
                      label="Software Version"
                      multiple
                      options={[
                        { key: '1.0', text: '1.0', value: '1.0' },
                        { key: '2.0', text: '2.0', value: '2.0' },
                      ]}
                      placeholder="Software Version"
                    />
                    <Form.Select
                      label="IP Address"
                      multiple
                      options={[
                        { key: '1', text: '12.32.54.658', value: 'alcatel' },
                        { key: '2', text: '123.4r.54.65', value: 'alcatel' },
                      ]}
                      placeholder="IP Address"
                    />
                    <Form.Select
                      label="Configuration"
                      multiple
                      options={[
                        { key: '1.0', text: 'xyz', value: '1.0' },
                        { key: '2.0', text: 'abc', value: '2.0' },
                      ]}
                      placeholder="Configuration"
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

              <Modal
                dimmer="blurring"
                trigger={
                  <Menu.Item name="MTA">
                    MTA
                  </Menu.Item>
                }
              >
                <Modal.Header>MTA Filters</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Select
                      label="CMTS Name"
                      multiple
                      options={[
                        { key: 'cmts-1', text: 'CMTS-1', value: 'cmts-1' },
                        { key: 'cmts-2', text: 'CMTS-2', value: 'cmts-2' },
                        { key: 'cmts-3', text: 'CMTS-3', value: 'cmts-3' },
                        { key: 'cmts-4', text: 'CMTS-4', value: 'cmts-4' },
                      ]}
                      placeholder="CMTS Name"
                    />
                    <Form.Select
                      label="IP Address"
                      multiple
                      options={[
                        { key: '1', text: '12.32.54.658', value: 'alcatel' },
                        { key: '2', text: '123.4r.54.65', value: 'alcatel' },
                      ]}
                      placeholder="IP Address"
                    />
                    <Form.Select
                      label="Model"
                      multiple
                      options={[
                        { key: '1', text: 'Alcatel', value: 'alcatel' },
                        { key: '2', text: 'Cirrus', value: 'alcatel' },
                      ]}
                      placeholder="Model"
                    />

                    <Form.Select
                      label="Software Version"
                      multiple
                      options={[
                        { key: '1.0', text: '1.0', value: '1.0' },
                        { key: '2.0', text: '2.0', value: '2.0' },
                      ]}
                      placeholder="Software Version"
                    />
                    <label>CPU</label>
                    <Picker />
                    <label>Memory</label>
                    <Picker />
                    <label>Temp</label>
                    <Picker />
                    <label>Uptime</label>
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
