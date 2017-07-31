import React, { Component } from "react";
import { Button, Modal, Icon } from "semantic-ui-react";
import Picker from "./Picker";

class PickerFilterModal extends Component {
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
            <Picker />
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

export default PickerFilterModal;
