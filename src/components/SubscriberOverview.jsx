import React, { Component } from "react";
import {
  // Accordion,
  // Card,
  Statistic,
  Table,
  Image,
  Item,
  // Divider,
  Menu,
  Segment,
  Message,
  Header,
  Grid
} from "semantic-ui-react";
import DataTable from "./DataTable";
import tableData from "../data/SubscrOverviewData.js";

const Alerts = () => (
  <Message
    error
    header="Alerts"
    list={[
      "CTMS-02 Port capacity at 17%",
      "Modem-X interface P downstream power at 12%"
    ]}
  />
);

const All = ({ stream }) => (
  <Table compact celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan="7">{stream} Data</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Interface</Table.Cell>
        <Table.Cell><a href="#openModal">P</a></Table.Cell>
        <Table.Cell><a href="#openModal">0</a></Table.Cell>
        <Table.Cell><a href="#openModal">1</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">3</a></Table.Cell>
        <Table.Cell><a href="#openModal">4</a></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>SNR</Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
        <Table.Cell><a href="#openModal">2.0</a></Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>RXMER</Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>DownPower</Table.Cell>
        <Table.Cell negative>12</Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
        <Table.Cell><a href="#openModal">12</a></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Reflection</Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>FEC-a</Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>FEC-b</Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>FEC-c</Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
        <Table.Cell><a href="#openModal">2</a></Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

const Cmts = ({ data }) => (
  <Item>
    <Item.Content>
      <Image floated="right" size="mini" src="/img/cmts.jpg" />
      <Item.Header>
        CMTS Health
      </Item.Header>
      <Item.Meta>
        <span className="cinema">Last Updated: 10 Minutes ago</span>
      </Item.Meta>
      <Item.Description>
        <Segment inverted>
          <Statistic.Group size="small" widths="three">
            <Statistic color="blue" size="small" inverted>
              <Statistic.Value text>C/U2/7.0</Statistic.Value>
              <Statistic.Label>Port</Statistic.Label>
            </Statistic>
            <Statistic color="blue" size="small" inverted>
              <Statistic.Value text>3</Statistic.Value>
              <Statistic.Label>Fiber Node</Statistic.Label>
            </Statistic>
            <Statistic color="red" size="small" inverted>
              <Statistic.Value text>17%</Statistic.Value>
              <Statistic.Label>Port Capacity</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Segment>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <All stream="Downstream" />
            </Grid.Column>
            <Grid.Column>
              <All stream="Upstream" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Item.Description>
    </Item.Content>
  </Item>
);
const Modem = ({ data }) => (
  <Item.Group relaxed divided>
    <Item>
      <Item.Content>
        <Image floated="right" size="tiny" src="/img/modem.jpg" />
        <Item.Header>
          Modem-X Health
        </Item.Header>
        <Item.Meta>
          <span className="cinema">Last Updated: 8 Minutes ago</span>
        </Item.Meta>
        <Item.Description>
          <Segment inverted>
            <Statistic.Group size="small" widths="eight">
              <Statistic color="blue" size="small" inverted>
                <Statistic.Value text>Cable Modem</Statistic.Value>
                <Statistic.Label>Equipment</Statistic.Label>
              </Statistic>
              <Statistic color="blue" size="small" inverted>
                <Statistic.Value text>
                  AA:BB:CC:DD:EE:FF
                </Statistic.Value>
                <Statistic.Label>MAC Address</Statistic.Label>
              </Statistic>
              <Statistic color="blue" size="small" inverted>
                <Statistic.Value text>
                  60.122.54.06
                </Statistic.Value>
                <Statistic.Label>IP Address</Statistic.Label>
              </Statistic>
              <Statistic color="blue" size="small" inverted>
                <Statistic.Value text>
                  DOCSIS
                </Statistic.Value>
                <Statistic.Label>Service</Statistic.Label>
              </Statistic>
              <Statistic color="blue" size="small" inverted>
                <Statistic.Value text>
                  TDS-GOLD{" "}
                </Statistic.Value>
                <Statistic.Label>Product</Statistic.Label>
              </Statistic>
              <Statistic color="blue" size="small" inverted>
                <Statistic.Value text>
                  60 Mps
                </Statistic.Value>
                <Statistic.Label>Down Speed</Statistic.Label>
              </Statistic>
              <Statistic color="blue" size="small" inverted>
                <Statistic.Value text>
                  10 Mps
                </Statistic.Value>
                <Statistic.Label>Up Speed</Statistic.Label>
              </Statistic>
              <Statistic color="blue" size="small" inverted>
                <Statistic.Value text>
                  101.10
                </Statistic.Value>
                <Statistic.Label>Prove Type</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <All stream="Downstream" />
              </Grid.Column>
              <Grid.Column>
                <All stream="Upstream" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Item.Description>
      </Item.Content>
    </Item>
    <Cmts />
  </Item.Group>
);

class ModemMenu extends Component {
  state = { activeItem: "modem A" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { activeItem } = this.state;
    const tabContent = [
      <Modem data="modem A" />,
      <Modem data="modem B" />,
      <Modem data="modem C" />
    ];
    return (
      <div>
        <Menu attached="top" tabular>
          <Menu.Item
            name="modem A"
            active={activeItem === "modem A"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="modem B"
            active={activeItem === "modem B"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="modem C"
            active={activeItem === "modem C"}
            onClick={this.handleItemClick}
          />
        </Menu>
        <Segment attached="bottom">
          {activeItem === "modem A" ? tabContent[0] : ""}
          {activeItem === "modem B" ? tabContent[1] : ""}
          {activeItem === "modem C" ? tabContent[2] : ""}
        </Segment>
      </div>
    );
  }
}

// const Power = () => (
//   <table className="ui compact striped celled definition table">
//     <tbody>
//       <Table.Row>
//         <th>Interface</th>
//         <Table.Cell><a href="#openModal">P</a></Table.Cell>
//         <Table.Cell><a href="#openModal">0</a></Table.Cell>
//         <Table.Cell><a href="#openModal">1</a></Table.Cell>
//         <Table.Cell><a href="#openModal">2</a></Table.Cell>
//         <Table.Cell><a href="#openModal">3</a></Table.Cell>
//         <Table.Cell><a href="#openModal">4</a></Table.Cell>
//       </Table.Row>
//       <Table.Row>
//         <th>RXMER</th>
//         <Table.Cell><a href="#openModal">12</a></Table.Cell>
//         <Table.Cell><a href="#openModal">12</a></Table.Cell>
//         <Table.Cell><a href="#openModal">12</a></Table.Cell>
//         <Table.Cell><a href="#openModal">12</a></Table.Cell>
//         <Table.Cell><a href="#openModal">12</a></Table.Cell>
//         <Table.Cell><a href="#openModal">12</a></Table.Cell>
//       </Table.Row>
//       <Table.Row>
//         <th>DownPower</th>
//         <Table.Cell><a href="#openModal">12</a></Table.Cell>
//         <Table.Cell><a href="#openModal">12</a></Table.Cell>
//         <Table.Cell><a href="#openModal">12</a></Table.Cell>
//         <Table.Cell><a href="#openModal">12</a></Table.Cell>
//         <Table.Cell><a href="#openModal">12</a></Table.Cell>
//         <Table.Cell><a href="#openModal">12</a></Table.Cell>
//       </Table.Row>
//     </tbody>
//   </table>
// );

// class Info1 extends Component {
//   state = { activeItem: "alert" };
//   handleItemClick = (e, { name }) => this.setState({ activeItem: name });

//   render() {
//     const { activeItem } = this.state;
//     const tabContent = [<Alerts />, <Power />, <All />];
//     return (
//       <div>
//         <Menu attached="top" tabular>
//           <Menu.Item
//             name="power"
//             active={activeItem === "power"}
//             onClick={this.handleItemClick}
//           />
//           <Menu.Item
//             name="all"
//             active={activeItem === "all"}
//             onClick={this.handleItemClick}
//           />
//         </Menu>
//         <Segment attached="bottom">
//           {activeItem === "alert" ? tabContent[0] : ""}
//           {activeItem === "power" ? tabContent[1] : ""}
//           {activeItem === "all" ? tabContent[2] : ""}
//         </Segment>
//       </div>
//     );
//   }
// }

// class Info2 extends Component {
//   state = { activeItem: "alert" };

//   handleItemClick = (e, { name }) => {
//     this.setState({ activeItem: name });
//   };

//   render() {
//     const { activeItem } = this.state;
//     const tabContent = [<Alerts />, <Power />, <All />];
//     return (
//       <div className="scrolling">
//         <Menu attached="top" tabular>
//           <Menu.Item
//             name="alert"
//             active={activeItem === "alert"}
//             onClick={this.handleItemClick}
//           />
//           <Menu.Item
//             name="power"
//             active={activeItem === "power"}
//             onClick={this.handleItemClick}
//           />
//           <Menu.Item
//             name="PNM"
//             active={activeItem === "PNM"}
//             onClick={this.handleItemClick}
//           />
//           <Menu.Item
//             name="all"
//             active={activeItem === "all"}
//             onClick={this.handleItemClick}
//           />
//         </Menu>
//         <Segment attached="bottom">
//           {activeItem === "alert" ? tabContent[0] : ""}
//           {activeItem === "power" ? tabContent[1] : ""}
//           {activeItem === "all" ? tabContent[2] : ""}
//         </Segment>
//       </div>
//     );
//   }
// }

// const CardGroups = () => (
//   <Grid columns={2}>
//     <Grid.Row>
//       <Grid.Column>
//         <Card.Group>
//           <Card fluid>
//             <Card.Content>
//               <Image floated="right" size="small" src="/img/cmts.jpg" />
//               <Card.Header>
//                 CMTS Health
//               </Card.Header>
//               <Card.Meta>
//                 Last Updated : 10 Minutes ago
//               </Card.Meta>
//               <Card.Description>
//                 <table className="ui compact very basic table">
//                   <tbody>
//                     <Table.Row>
//                       <Table.Cell className="right aligned">Port:</Table.Cell>
//                       <Table.Cell>C/U2/7.0</Table.Cell>
//                     </Table.Row>
//                     <Table.Row>
//                       <Table.Cell className="right aligned">
//                         Fiber Node:
//                       </Table.Cell>
//                       <Table.Cell>3</Table.Cell>
//                     </Table.Row>
//                     <Table.Row>
//                       <Table.Cell className="right aligned">
//                         Port Capacity:
//                       </Table.Cell>
//                       <Table.Cell className="positive">80% </Table.Cell>
//                     </Table.Row>
//                     <Table.Row>
//                       <Table.Cell className="right aligned">
//                         Online Percent
//                       </Table.Cell>
//                       <Table.Cell>100%</Table.Cell>
//                     </Table.Row>
//                   </tbody>
//                 </table>
//               </Card.Description>
//               <Divider />
//               <b>Info 1</b>
//               <Info1 />
//               <Divider />
//               <b>Info 2</b>
//               <Info2 />
//             </Card.Content>
//           </Card>
//         </Card.Group>
//       </Grid.Column>
//       <Grid.Column>
//         <Card.Group>
//           <Card fluid>
//             <Card.Content>
//               <Image floated="right" size="mini" src="/img/modem.jpg" />
//               <Card.Header>
//                 Modem-X Health
//               </Card.Header>
//               <Card.Meta>
//                 Last Updated : 8 Minutes ago
//               </Card.Meta>
//               <Card.Description>
//                 <table className="ui compact very basic table">
//                   <Table.Row>
//                     <Table.Cell className="right aligned">
//                       Equipment Type:
//                     </Table.Cell>
//                     <Table.Cell>Cable Modem </Table.Cell>
//                   </Table.Row>
//                   <Table.Row>
//                     <Table.Cell className="right aligned">
//                       Mac Address:
//                     </Table.Cell>
//                     <Table.Cell>
//                       <a href="Filters/filter_cpe.html">AA:BB:CC:DD:EE:FF</a>
//                     </Table.Cell>
//                   </Table.Row>
//                   <Table.Row>
//                     <Table.Cell className="right aligned">
//                       IP Address:
//                     </Table.Cell>
//                     <Table.Cell>
//                       <a href="Filters/filter_cpe.html">60.10.208.10 </a>
//                       <a href="Filters/filter_cpe.html">
//                         <div className="ui icon button" data-tooltip="History">
//                           <i className="history icon" />
//                         </div>
//                       </a>
//                     </Table.Cell>
//                   </Table.Row>
//                   <Table.Row>
//                     <Table.Cell className="right aligned">Service:</Table.Cell>
//                     <Table.Cell>DOCSIS</Table.Cell>
//                   </Table.Row>
//                   <Table.Row>
//                     <Table.Cell className="right aligned">
//                       Product Name:
//                     </Table.Cell>
//                     <Table.Cell>TDS-GOLD</Table.Cell>
//                   </Table.Row>
//                   <Table.Row>
//                     <Table.Cell className="right aligned">
//                       Download Speed:
//                     </Table.Cell>
//                     <Table.Cell>10 Mbps</Table.Cell>
//                   </Table.Row>
//                   <Table.Row>
//                     <Table.Cell className="right aligned">
//                       Upload Speed:
//                     </Table.Cell>
//                     <Table.Cell>10 Mbps</Table.Cell>
//                   </Table.Row>
//                   <Table.Row>
//                     <Table.Cell className="right aligned">
//                       Prove Type:
//                     </Table.Cell>
//                     <Table.Cell>100.10</Table.Cell>
//                   </Table.Row>
//                 </table>
//                 <Divider />
//                 <Info1 />
//                 <Divider />
//                 <Info2 />
//               </Card.Description>
//             </Card.Content>
//           </Card>
//         </Card.Group>
//       </Grid.Column>
//     </Grid.Row>
//   </Grid>
// );

// const panels = [
//   {
//     key: "2",
//     title: "CMTS-01",
//     content: <CardGroups />
//   },
//   {
//     key: "3",
//     title: "CMTS-02",
//     content: <CardGroups />
//   }
// ];

export default class SubscriberOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: tableData.tableData,
      activeIndex: [0, 1]
    };
  }

  handleTitleClick = (e, i) =>
    this.setState({
      activeIndex: this.state.activeIndex.indexOf(i) >= 0
        ? this.state.activeIndex.pop(i)
        : this.state.activeIndex.push(3)
    });

  render() {
    return (
      <div>
        {/* <h1>Hello {this.props.match.params.userid}</h1>*/}
        <Alerts />
        <ModemMenu />
        {/*<Accordion panels={panels} fluid styled open exclusive={false} />*/}
        <Header as="h3" attached="top">Orders</Header>
        <Segment attached="bottom">
          <DataTable data={tableData.tableData.orders} />
        </Segment>
        <Header as="h3" attached="top">Equipment</Header>
        <Segment attached="bottom">
          <DataTable data={tableData.tableData.equipment} />
        </Segment>
      </div>
    );
  }
}
