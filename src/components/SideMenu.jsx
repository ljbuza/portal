import React, { Component } from "react";
import { Form, Modal, Menu, Label, Button } from "semantic-ui-react";
import Picker from "./Picker";
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.rawData = [...this.props.store.data];
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = evt => {
    evt.preventDefault();
    // const { usds, name, modem } = this.state;
    this.setState({
      submittedUsds: this.state.miUsds,
      submittedName: this.state.miName,
      submittedModem: this.state.miModem
    });
  };

  render() {
    let cmtsLabel = <div />;
    if (Object.keys(this.props.store.filters).length) {
      let labelCount = 0;
      Object.keys(this.props.store.filters).map(key => {
        if (
          key.startsWith("networkCmts") &&
          this.props.store.filters[key].length
        ) {
          labelCount += 1;
        }
        return undefined;
      });
      if (labelCount) {
        cmtsLabel = <Label color="blue">{labelCount}</Label>;
      }
    }
    if (this.props.store.isLoading) {
      return <div>is loading...</div>;
    } else {
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
                      <FilterLabel
                        section="networkCmts"
                        filters={this.props.store.filters["networkCmts"]}
                      />
                      {cmtsLabel}
                      CMTS
                    </Menu.Item>
                  }
                >
                  <Modal.Header>CMTS Filters</Modal.Header>
                  <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Select
                        name="networkCmts-Name"
                        label="CMTS Name"
                        multiple
                        value={this.props.store.filters["networkCmts-Name"]}
                        onChange={this.props.store.addFilter}
                        options={this.props.store.options.networkCmts["Name"]}
                        placeholder="CMTS Name"
                      />
                      <Form.Select
                        name="networkCmts-Model"
                        label="Model"
                        value={this.props.store.filters["networkCmts-Model"]}
                        multiple
                        onChange={this.props.store.addFilter}
                        options={this.props.store.options.networkCmts["Model"]}
                        placeholder="Model"
                      />
                      <Form.Select
                        name="networkCmts-Software Version"
                        label="Software Version"
                        multiple
                        value={
                          this.props.store.filters[
                            "networkCmts-Software Version"
                          ]
                        }
                        onChange={this.props.store.addFilter}
                        options={
                          this.props.store.options.networkCmts[
                            "Software Version"
                          ]
                        }
                        placeholder="Software Version"
                      />
                      <label>CPU</label>
                      <Form.Input />
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
                      color="black"
                      size="small"
                      content="Close"
                      onClick={this.close}
                    />
                    <Button
                      positive
                      size="small"
                      icon="undo"
                      labelPosition="right"
                      content="Clear Filters"
                      onClick={this.props.handleClearForm}
                    />
                  </Modal.Actions>
                </Modal>

                <Modal
                  dimmer="blurring"
                  trigger={
                    <Menu.Item name="mac-domain">
                      MAC Domain
                    </Menu.Item>
                  }
                >
                  <Modal.Header>MAC Domain Filters</Modal.Header>
                  <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Select
                        name="MAC Domain"
                        label="MAC Domain"
                        value={this.props.store.filters["networkMac-Name"]}
                        multiple
                        onChange={this.props.store.addFilter}
                        options={this.props.store.options.networkMac["Name"]}
                        placeholder="MAC Domain"
                      />
                      <Form.Select
                        name="CMTS"
                        label="CMTS"
                        value={this.props.store.filters["networkMac-CMTS"]}
                        multiple
                        onChange={this.props.store.addFilter}
                        options={this.props.store.options.networkMac["CMTS"]}
                        placeholder="CMTS"
                      />
                      <Form.Select
                        label="Alias"
                        name="Alias"
                        value={this.props.store.filters["networkMac-Alias"]}
                        multiple
                        onChange={this.props.store.addFilter}
                        options={this.props.store.options.networkMac["Alias"]}
                        placeholder="Alias"
                      />
                      <label>Fiber Nodes</label>
                      <Picker />
                      <label>Modems Online</label>
                      <Picker />
                      <label>Modems Offline</label>
                      <Picker />
                      <label>Upstream Interfaces</label>
                      <Picker />
                      <label>Downstream Interfaces</label>
                      <Picker />
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="black" size="small" onClick={this.close}>
                      Cancel
                    </Button>
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
                    <Menu.Item name="fiber-node">
                      <FilterLabel
                        section="fiberNode"
                        filters={this.props.store.filters["fiberNode"]}
                      />
                      Fiber Node
                    </Menu.Item>
                  }
                >
                  <Modal.Header>Fiber Node Filters</Modal.Header>
                  <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Select
                        label="Fiber Node"
                        name="networkFiber-Name"
                        value={this.props.store.filters["networkFiber-Name"]}
                        multiple
                        onChange={this.props.store.addFilter}
                        options={this.props.store.options.networkFiber["Name"]}
                        placeholder="Fiber Node"
                      />
                      <Form.Select
                        label="MAC DOmain"
                        name="networkFiber-MAC Domain"
                        value={
                          this.props.store.filters["networkFiber-MAC Domain"]
                        }
                        multiple
                        onChange={this.props.store.addFilter}
                        options={
                          this.props.store.options.networkFiber["MAC Domain"]
                        }
                        placeholder="MAC Domain"
                      />
                      <Form.Select
                        label="CMTS Name"
                        name="networkFiber-CMTS"
                        value={this.props.store.filters["networkFiber-CMTS"]}
                        multiple
                        onChange={this.props.store.addFilter}
                        options={this.props.store.options.networkFiber["CMTS"]}
                        placeholder="CMTS Name"
                      />
                      <Form.Select
                        label="Alias"
                        name="networkFiber-Alias"
                        value={this.props.store.filters["networkFiber-Alias"]}
                        multiple
                        onChange={this.props.store.addFilter}
                        options={this.props.store.options.networkFiber["Alias"]}
                        placeholder="Alias"
                      />
                      <label>Modems Online</label>
                      <Picker />
                      <label>Modems Offline</label>
                      <Picker />
                      <label>Upstream Interfaces</label>
                      <Picker />
                      <label>Downstream Interfaces</label>
                      <Picker />
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="black" size="small" onClick={this.close}>
                      Cancel
                    </Button>
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
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Select
                        label="Modem"
                        name="networkModem-Name"
                        value={this.props.store.filters["networkModem-Name"]}
                        multiple
                        onChange={this.props.store.addFilter}
                        options={this.props.store.options.networkModem["Name"]}
                        placeholder="Modem"
                      />
                      <Form.Select
                        label="Fiber Node"
                        name="networkModem-Fiber"
                        value={this.props.store.filters["networkModem-Fiber"]}
                        multiple
                        onChange={this.props.store.addFilter}
                        options={this.props.store.options.networkModem["Fiber"]}
                        placeholder="Fiber Node"
                      />
                      <Form.Select
                        label="MD Name"
                        name="networkModem-MAC Domain"
                        value={
                          this.props.store.filters["networkModem-MAC Domain"]
                        }
                        multiple
                        onChange={this.props.store.addFilter}
                        options={
                          this.props.store.options.networkModem["MAC Domain"]
                        }
                        placeholder="MD Name"
                      />
                      <Form.Select
                        label="CMTS Name"
                        name="networkModem-CMTS"
                        value={this.props.store.filters["networkModem-CMTS"]}
                        multiple
                        onChange={this.props.store.addFilter}
                        options={this.props.store.options.networkModem["CMTS"]}
                        placeholder="CMTS Name"
                      />
                      <Form.Select
                        label="Status"
                        name="networkModem-Status"
                        value={this.props.store.filters["networkModem-Status"]}
                        multiple
                        onChange={this.props.store.addFilter}
                        options={
                          this.props.store.options.networkModem["Status"]
                        }
                        placeholder="Status"
                      />
                      <label>Upstream Interfaces</label>
                      <Picker />
                      <label>Downstream Interfaces</label>
                      <Picker />
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="black" size="small" onClick={this.close}>
                      Cancel
                    </Button>
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
}

@observer class FilterLabel extends React.Component {
  // const FilterLabel = ({ section, filters }) => {
  render() {
    let labelCount = 0;
    const filters = this.props.filters;
    const section = this.props.section;

    if (filters && Object.keys(filters).length) {
      Object.keys(filters).map(key => {
        if (key.startsWith(section) && filters[key].length) {
          labelCount += 1;
        }
        return undefined;
      });
    }

    return (
      <div>
        {labelCount > 0 ? <Label color="blue">{labelCount}</Label> : ""}
      </div>
    );
  }
}
