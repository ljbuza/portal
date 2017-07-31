import _ from "lodash";
import React, { Component } from "react";
import { Table, Menu, Icon } from "semantic-ui-react";

const tableData = [
  {
    status: <Icon name="circle" color="red" />,
    equipment: "CMTS-2",
    last_updated: "10 minutes ago",
    field: "Port Capacity",
    value: "89%"
  },
  {
    status: <Icon name="circle" color="yellow" />,
    equipment: "CMTS-1",
    last_updated: "4 minutes ago",
    field: "Port Capacity",
    value: "89%"
  },
  {
    status: <Icon name="circle" color="red" />,
    equipment: "CMTS-3",
    last_updated: "1 hour ago",
    field: "Port Capacity",
    value: "89%"
  },
  {
    status: <Icon name="circle" color="red" />,
    equipment: "CMTS-5",
    last_updated: "1 hour ago",
    field: "Port Capacity",
    value: "89%"
  }
];
export default class Alerts extends Component {
  state = {
    column: null,
    data: tableData,
    direction: null
  };

  getOptions = field => {
    return Object.assign(
      this.state.data.map(d => ({
        key: d[field],
        text: d[field],
        value: d[field]
      }))
    );
  };
  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      });
      return;
    }
    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "decending" : "ascending"
    });
  };

  render() {
    const { column, data, direction } = this.state;
    const status_options = [
      { key: "red", text: "Red", value: "red" },
      { key: "yellow", text: "yellow", value: "yellow" }
    ];
    return (
      <Table striped selectable sortable size="small" compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "status" && direction}
              onClick={this.handleSort("status")}
              className="two wide"
            >
              Status
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "equipment" && direction}
              onClick={this.handleSort("equipment")}
            >
              Equipment
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "last_updated" && direction}
              onClick={this.handleSort("last_updated")}
            >
              Last Updated
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "field" && direction}
              onClick={this.handleSort("field")}
            >
              Field
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "value" && direction}
              onClick={this.handleSort("value")}
            >
              Value
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({ status, equipment, last_updated, field, value }) => (
            <Table.Row key={equipment}>
              <Table.Cell>{status}</Table.Cell>
              <Table.Cell>{equipment}</Table.Cell>
              <Table.Cell>{last_updated}</Table.Cell>
              <Table.Cell>{field}</Table.Cell>
              <Table.Cell>{value}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="10">
              <Menu size="mini" floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="left chevron" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="right chevron" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}
