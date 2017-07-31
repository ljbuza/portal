import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Menu, Icon } from 'semantic-ui-react';

const Subscriber = ({ match }) => (
  <Table striped selectable sortable size="small" compact>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>First Name</Table.HeaderCell>
        <Table.HeaderCell>Last Name</Table.HeaderCell>
        <Table.HeaderCell>Billing Acct</Table.HeaderCell>
        <Table.HeaderCell>Address</Table.HeaderCell>
        <Table.HeaderCell>City</Table.HeaderCell>
        <Table.HeaderCell>State</Table.HeaderCell>
        <Table.HeaderCell>Zip</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell><Link to={`${match.url}/2`}>Noal</Link></Table.Cell>
        <Table.Cell>Miles</Table.Cell>
        <Table.Cell>123A321</Table.Cell>
        <Table.Cell>123 Main St.</Table.Cell>
        <Table.Cell>Madison</Table.Cell>
        <Table.Cell>WI</Table.Cell>
        <Table.Cell>52343</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Smith</Table.Cell>
        <Table.Cell>123A321</Table.Cell>
        <Table.Cell>532 Crosstown Rd.</Table.Cell>
        <Table.Cell>Madison</Table.Cell>
        <Table.Cell>WI</Table.Cell>
        <Table.Cell>52343</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Mary</Table.Cell>
        <Table.Cell>Anderson</Table.Cell>
        <Table.Cell>123A321</Table.Cell>
        <Table.Cell>123 Maple St.</Table.Cell>
        <Table.Cell>Sun Prairie</Table.Cell>
        <Table.Cell>WI</Table.Cell>
        <Table.Cell>52343</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Howard</Table.Cell>
        <Table.Cell>Jones</Table.Cell>
        <Table.Cell>123A321</Table.Cell>
        <Table.Cell>123 Hemlock Ave.</Table.Cell>
        <Table.Cell>Waunakee</Table.Cell>
        <Table.Cell>WI</Table.Cell>
        <Table.Cell>52343</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Juanita</Table.Cell>
        <Table.Cell>Juarez</Table.Cell>
        <Table.Cell>123A321</Table.Cell>
        <Table.Cell>123 Morningside Dr.</Table.Cell>
        <Table.Cell>Madison</Table.Cell>
        <Table.Cell>WI</Table.Cell>
        <Table.Cell>52343</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Noal</Table.Cell>
        <Table.Cell>Miles</Table.Cell>
        <Table.Cell>123A321</Table.Cell>
        <Table.Cell>123 Main St.</Table.Cell>
        <Table.Cell>Madison</Table.Cell>
        <Table.Cell>WI</Table.Cell>
        <Table.Cell>52343</Table.Cell>
      </Table.Row>
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

export default Subscriber;
