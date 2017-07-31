import React, { Component } from "react";
import {
  Button,
  Input,
  Segment,
  Grid,
  Icon,
  Dropdown
} from "semantic-ui-react";

export default class RefDocEditor extends Component {
  state = {};
  handleChildUpdate = (i, k, v) => {
    var keyvals = this.state.keyvals;
    keyvals[i]["tag"] = k;
    keyvals[i]["val"] = v;
    this.setState({
      keyvals: keyvals
    });
  };
  deleteKeyValue = i => {
    var keyvals = this.state.keyvals;
    keyvals.splice(i, 1);
    this.setState({
      keyvals: keyvals
    });
  };
  componentWillMount = () => {
    console.log("match?", this.props.match);
    // fetch tag-maps
    var tagmap = [
      // comes from tag-map
      { text: "template", value: "template" },
      { text: "_comment", value: "_comment" },
      { text: "_dev_comment", value: "_dev_comment" },
      { text: "foo4", value: "foo4" },
      { text: "foo5", value: "foo5" },
      { text: "foo6", value: "foo6" },
      { text: "foo7", value: "foo7" },
      { text: "foo8", value: "foo8" }
    ];

    var keyvals = [];
    // if doc is provided in props. we'll be using that
    if (this.props.doc) {
      keyvals = [
        ...keyvals,
        ...Object.keys(this.props.doc).map(k => {
          var val = this.props.doc[k];
          return { tag: k, val: val };
        })
      ];
    }
    if (this.props.description) {
      keyvals = [...keyvals, { tag: "_comment", val: this.props.description }];
    }
    this.setState({
      keyvals: keyvals,
      keys: tagmap
    });
  };
  moveup = i => {
    var keyvals = this.state.keyvals; // remove from it's curent location
    var x = keyvals.splice(i, 1)[0];
    keyvals.splice(i - 1, 0, x); // insert it in 1 higher
    this.setState({
      keyvals: keyvals
    });
  };
  movedown = i => {
    var keyvals = this.state.keyvals; // remove from it's curent location
    var x = keyvals.splice(i, 1)[0];
    keyvals.splice(i + 1, 0, x); // insert it in 1 lower
    this.setState({
      keyvals: keyvals
    });
  };
  addkeyVal = i => {
    var keyvals = this.state.keyvals; // remove from it's curent location
    keyvals.splice(i + 1, 0, { tag: "", val: "" });
    this.setState({
      keyvals: keyvals
    });
  };
  render = () => {
    return (
      <div>

        {this.state.keyvals.length === 0 &&
          <Segment basic>
            <Segment inverted>
              <Button fluid icon="plus" onClick={() => this.addkeyVal(0)} />
            </Segment>
          </Segment>}
        <Segment>
          {this.state.keyvals.map(({ tag, val }, i) => {
            return (
              <KeyValue
                delete={this.deleteKeyValue}
                updateKeyVal={this.handleChildUpdate}
                moveup={this.moveup}
                movedown={this.movedown}
                key={i}
                id={i}
                rows={this.state.keyvals.length}
                tag={tag}
                val={val}
                keys={this.state.keys}
                addkeyVal={this.addkeyVal}
              />
            );
          })}
        </Segment>
      </div>
    );
  };
}

class KeyValue extends Component {
  handleKeyChange = (e, { value }) => {
    this.props.updateKeyVal(parseInt(this.props.id, 0), value, this.props.val);
  };
  handleValueChange = (e, { value }) => {
    this.props.updateKeyVal(parseInt(this.props.id, 0), this.props.tag, value);
  };
  deleteKeyValue = () => {
    this.props.delete(this.props.id);
  };
  moveup = () => {
    this.props.moveup(this.props.id);
  };
  movedown = () => {
    this.props.movedown(this.props.id);
  };
  addkeyVal = () => {
    this.props.addkeyVal(this.props.id);
  };
  render = () => {
    return (
      <Grid.Row stretched>
        <Grid>
          <Grid.Column width={1}>
            <Grid.Row>
              <Icon
                size="large"
                name="chevron circle up"
                className="Button"
                link={!(parseInt(this.props.id, 0) < 1)} // a link if not at the top
                onClick={this.moveup}
                disabled={parseInt(this.props.id, 0) < 1}
              />
            </Grid.Row>
            <Grid.Row>
              <Icon
                size="large"
                // a link if id != 0
                name="chevron circle down"
                className="Button"
                link={!(this.props.id >= this.props.rows - 1)}
                onClick={this.movedown}
                disabled={this.props.id >= this.props.rows - 1}
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={4}>
            <Dropdown
              placeholder="Key"
              floating
              button
              compact
              selection
              fluid
              onChange={this.handleKeyChange}
              options={this.props.keys}
              value={this.props.tag}
            />
          </Grid.Column>
          <Grid.Column stretched width={10}>
            <Input
              placeholder="Value"
              value={this.props.val}
              fluid
              onChange={this.handleValueChange}
            />
          </Grid.Column>
          <Grid.Column floated="right" width={1}>
            <Grid.Row>
              <Icon
                size="large"
                link={true}
                name="remove circle"
                onClick={this.deleteKeyValue}
              />
            </Grid.Row>
            <Grid.Row>
              <Icon
                size="large"
                link={true}
                name="add circle"
                onClick={this.addkeyVal}
              />
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Grid.Row>
    );
  };
}
