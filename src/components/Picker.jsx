import React, { Component } from "react";
import { Form, Radio, Input } from "semantic-ui-react";

const options = [
  { key: "gt", value: ">", text: ">" },
  { key: "lt", value: "<", text: "<" },
  { key: "ne", value: "!=", text: "!=" },
  { key: "le", value: "<=", text: "<=" },
  { key: "ge", value: ">=", text: ">=" }
];

export default class Picker extends Component {
  state = {};
  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { value } = this.state;
    return (
      <div>
        <Form.Group>
          <Form.Radio
            label="Value:"
            value="value"
            checked={value === "value"}
            onChange={this.handleChange}
          />
          <Form.Select size="small" compact options={options} />
          <Form.Input size="small" />
        </Form.Group>
        <Form.Group inline>
          <Form.Field
            control={Radio}
            label="Value Between:"
            value="between"
            checked={value === "between"}
            onChange={this.handleChange}
          />
          <Form.Field size="small" control={Input} placeholder="" />
          <Form.Field size="small" control={Input} label="And" placeholder="" />
        </Form.Group>
      </div>
    );
  }
}
