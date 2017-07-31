import React, { Component } from "react";
import { Dropdown, Button, Modal, Icon } from "semantic-ui-react";

class SelectFilterModal extends Component {
  state = { open: false };
  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <span>
        <Icon bordered name="filter" onClick={this.show("blurring")} />
        <Modal size="small" dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Apply Filter</Modal.Header>
          <Modal.Content>
            <Dropdown
              placeholder=""
              fluid
              multiple
              selection
              options={this.props.options}
            />
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
      </span>
    );
  }
}

export default SelectFilterModal;
