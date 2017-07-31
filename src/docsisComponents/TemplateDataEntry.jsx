import React, { Component } from "react";
import {
  Grid,
  Icon,
  Dropdown,
  Input,
  Segment,
  Divider,
  Form,
  Button
} from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";

export default class TemplateDataEntry extends Component {
  getEntryID = () => {
    if (typeof this.props.dataEntryID === "number") {
      return this.props.dataEntryID;
    }
    return parseInt(this.props.dataEntryID.split(".").pop(), 10);
  };
  isTop = () => {
    return this.getEntryID() <= 0;
  };
  isBot = () => {
    return this.getEntryID() >= this.props.rows - 1;
  };
  moveup = () => {
    this.props.moveup(this.props.dataEntryID);
  };
  movedown = () => {
    this.props.movedown(this.props.dataEntryID);
  };
  addnew = () => {
    this.props.addnew(this.props.dataEntryID);
  };
  remove = () => {
    this.props.remove(this.props.dataEntryID);
  };
  handleLabelChange = (e, { text, value }) => {
    this.props.updateLabel(this.props.dataEntryID, value);
  };
  render() {
    return (
      <Grid.Row stretched>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Grid.Row>
                <Icon
                  size="large"
                  link={!this.isTop()} // a link if not at the top
                  name="chevron circle up"
                  className="Button"
                  disabled={this.isTop()} // disabled if id == 0
                  onClick={this.moveup}
                />
              </Grid.Row>
              <Grid.Row>
                <Icon
                  size="large"
                  // a link if id != 0
                  link={!this.isBot()}
                  name="chevron circle down"
                  className="Button"
                  onClick={this.movedown}
                  disabled={this.isBot()}
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={4}>
              <Dropdown
                placeholder="Key"
                button
                search
                floating
                fluid
                selection
                onChange={this.handleLabelChange}
                options={this.props.docsiskeywords.map(({ kw }, i) => {
                  return { text: kw, value: kw };
                })}
                text={this.props.label}
              />
            </Grid.Column>
            <Grid.Column stretched width={10}>
              <Switch location={{ pathname: this.props.type }}>
                <Route exact path="include">
                  <IncludeSetting {...this.props} />
                </Route>
                <Route exact path="snmp">
                  <SNMPSetting {...this.props} />
                </Route>
                <Route exact path="docsis">
                  <DocsisSetting {...this.props} />
                </Route>
                <Route exact path="aggregate">
                  <Divider />
                </Route>
              </Switch>
            </Grid.Column>
            <Grid.Column floated="right" width={1}>
              <Grid.Row>
                <Icon
                  size="large"
                  link={true}
                  name="remove circle"
                  disabled={false}
                  onClick={this.remove}
                />
              </Grid.Row>
              <Grid.Row>
                <Icon
                  size="large"
                  link={true}
                  name="add circle"
                  onClick={this.addnew}
                  disabled={false}
                />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Switch location={{ pathname: this.props.type }}>
            <Route exact path="aggregate">
              <Grid.Row>
                <Grid.Column
                  width={16}
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <AggregateSetting
                    addnew={this.props.addnew}
                    dataEntryID={this.props.dataEntryID}
                    docsiskeywords={this.props.docsiskeywords}
                    label={this.props.label}
                    mibs={this.props.mibs}
                    movedown={this.props.movedown}
                    moveup={this.props.moveup}
                    remove={this.props.remove}
                    rows={this.props.rows}
                    type={this.props.type}
                    updateDocsis={this.props.updateDocsis}
                    updateInclude={this.props.updateInclude}
                    updateLabel={this.props.updateLabel}
                    updateSnmp={this.props.updateSnmp}
                    value={this.props.value}
                  />
                </Grid.Column>
              </Grid.Row>
            </Route>
          </Switch>
        </Grid>
      </Grid.Row>
    );
  }
}

class IncludeSetting extends Component {
  updateInclude = (e, { value }) => {
    this.props.updateInclude(this.props.dataEntryID, value);
  };
  render() {
    return (
      <Input
        onChange={this.updateInclude}
        placeholder="Subtemplate ID"
        value={this.props.include}
      />
    );
  }
}

class SNMPSetting extends Component {
  updateSnmp = (e, { text, value }) => {
    this.props.updateSnmp(
      this.props.dataEntryID,
      value,
      this.props.value,
      this.props.index
    );
  };
  updateval = (e, { value }) => {
    this.props.updateSnmp(
      this.props.dataEntryID,
      this.props.id,
      value,
      this.props.index
    );
  };
  updateindex = (e, { value }) => {
    if (value === "") {
      this.props.updateSnmp(
        this.props.dataEntryID,
        this.props.id,
        this.props.value,
        ""
      );
    }
    value = parseInt(value, 10);
    if (isNaN(value)) {
      return;
    }
    value = Math.min(Math.max(value, 0), 99);
    this.props.updateSnmp(
      this.props.dataEntryID,
      this.props.id,
      this.props.value,
      value
    );
  };
  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Field width={9}>
            <Dropdown
              fluid
              selection
              button
              search
              placeholder="Snmp"
              options={this.props.mibs.map(({ id, name }) => {
                return { text: name, value: id };
              })}
              onChange={this.updateSnmp}
              value={this.props.id}
            />
          </Form.Field>
          <Form.Field width={5}>
            <Form.Input
              placeholder="val"
              onChange={this.updateval}
              value={this.props.value}
            />
          </Form.Field>
          <Form.Field width={2}>
            <Form.Input
              placeholder="i"
              onChange={this.updateindex}
              value={this.props.index}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}

class DocsisSetting extends Component {
  updateDocsis = (e, { value }) => {
    this.props.updateDocsis(this.props.dataEntryID, value);
  };
  render() {
    return (
      <Input
        placeholder="Value"
        value={this.props.value}
        onChange={this.updateDocsis}
      />
    );
  }
}

class AggregateSetting extends Component {
  addnew = i => {
    this.props.addnew(this.props.dataEntryID + "." + i);
  };
  render() {
    return (
      <div>
        {(this.props.value.length > 0 &&
          this.props.value.map((entry, i) => {
            return (
              <Segment key={i}>
                <TemplateDataEntry
                  docsiskeywords={
                    this.props.docsiskeywords.filter(({ kw }) => {
                      return kw === this.props.label;
                    })[0].children
                  }
                  mibs={this.props.mibs}
                  updateLabel={this.props.updateLabel}
                  updateSnmp={this.props.updateSnmp}
                  updateInclude={this.props.updateInclude}
                  updateDocsis={this.props.updateDocsis}
                  addnew={this.props.addnew}
                  remove={this.props.remove}
                  moveup={this.props.moveup}
                  movedown={this.props.movedown}
                  rows={this.props.value.length}
                  dataEntryID={this.props.dataEntryID + "." + i}
                  {...entry}
                />
              </Segment>
            );
          })) ||
          <Segment>
            <Button fluid icon="plus" onClick={() => this.addnew(-1)} />
          </Segment>}

      </div>
    );
  }
}
