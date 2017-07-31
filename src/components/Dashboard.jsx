import React, { Component } from "react";
import {
  Container,
  // Segment,
  Card,
  Message,
  Grid,
  List,
  // Link,
  Icon
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import Header from "./Header";
import tableData from "../data/DashboardData.js";
import DataTable from "./DataTable";

// will obv need to be fed alerts
const Alerts = props => (
  <Message negative>
    <Message.Header>Alerts</Message.Header>
    <List bulleted onClick={props.handleClick}>
      <List.Item content="CTMS-02 Port capacity at 17%" />
      <List.Item content="Fiber Node-X is at 92% capacity" />
      <List.Item>
        <List.Content>
          <em>See all Alerts</em> <Icon name="arrow circle outline right" />
        </List.Content>
      </List.Item>
    </List>
  </Message>
);

// need to refactor to use dbTable
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: tableData.tableData,
      item: ""
    };
  }

  handleClick = e => {
    this.setState({ item: e.target.innerText });
  };

  render() {
    const { data, item } = this.state;
    if (item === "CTMS-02 Port capacity at 17%") {
      return <Redirect to="databrowser/network-cmts" push />;
    } else if (item === "Fiber Node-X is at 92% capacity") {
      return <Redirect to="databrowser/network-Fiber" push />;
    } else if (item === "See all Alerts ") {
      return <Redirect to="databrowser/alerts" push />;
    }

    return (
      <div>
        <Header
          title="Dashboard"
          subtitle={new Date().toLocaleString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
          })}
        />
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width="sixteen">
                <Alerts item={item} handleClick={this.handleClick} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width="six">
                <Card fluid>
                  <Card.Content>
                    <div className="ui header small">Top Users</div>
                  </Card.Content>
                  <Card.Content
                    description={<DataTable data={data.topUsers} />}
                  />
                </Card>
                <Card fluid>
                  <Card.Content>
                    <div className="ui header small">Top CMTS Usage</div>
                  </Card.Content>
                  <Card.Content
                    description={<DataTable data={data.topCmtsUsage} />}
                  />
                </Card>
              </Grid.Column>
              <Grid.Column width="ten">
                <Card fluid>
                  <Card.Content>
                    <div className="ui header small">Pending Orders</div>
                  </Card.Content>
                  <Card.Content
                    description={<DataTable data={data.pendingOrders} />}
                  />
                </Card>
                <Card fluid>
                  <Card.Content>
                    <div className="ui header small">Completed Orders</div>
                  </Card.Content>
                  <Card.Content
                    description={<DataTable data={data.completedOrders} />}
                  />
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}
