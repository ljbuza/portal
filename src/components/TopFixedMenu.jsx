import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Image, Input } from "semantic-ui-react";

const searchOptions = [
  { key: "All", text: "All", value: "All" },
  { key: "Name", text: "Name", value: "Name" },
  { key: "Address", text: "Address", value: "Address" },
  { key: "Order", text: "Order", value: "Order" }
];

// export const TopFixedMenu = () => (
export default class TopFixedMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: "",
      searchOptions: searchOptions,
      greeting: window.bxeauth.username
        ? window.bxeauth.username
        : "Not Logged In"
    };
    this.updateGreeting = this.updateGreeting.bind(this);
    addEventListener("logout", this.updateGreeting);
  }
  updateGreeting() {
    console.log("waddup!!", window.bxeauth.username);
    this.setState({
      greeting: window.bxeauth.username
        ? window.bxeauth.username
        : "Not Logged In"
    });
  }
  handleItemClick(evt, { name }) {
    // evt.preventDefault();
    // history.pushState(null, '', this.props.to);
    history.pushState(null, "", evt.currentTarget.href);
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });
  render() {
    // const { isLoading, value, results } = this.state;
    return (
      <Menu fixed="top" inverted>
        {/*<Menu.Item name="CMTS" as={Link} to="/equip-cmts">*/}
        <Menu.Item>
          <Image
            width="25px"
            src="img/BxE Logo.png"
            as={Link}
            to="/dashboard"
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown item icon="sidebar">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/dashboard" text="Dashboard" />
              <Dropdown.Divider />
              <Dropdown.Header>Data Browser</Dropdown.Header>
              <Dropdown.Item
                as={Link}
                to="/databrowser/network-cmts"
                text="Network"
              />
              <Dropdown.Item
                as={Link}
                to="/databrowser/equip-cmts"
                text="Equipment"
              />
              <Dropdown.Item
                as={Link}
                to="/databrowser/subscribers"
                text="Subscribers"
              />
              <Dropdown.Item as={Link} to="/databrowser/orders" text="Orders" />
              <Dropdown.Item as={Link} to="/databrowser/alerts" text="Alerts" />
              <Dropdown.Item as={Link} to="/databrowser/map" text="Maps" />
              <Dropdown.Divider />
              <Dropdown.Item
                as={Link}
                to="/docsismaintenance"
                text="Docsis Maintenance"
              />
            </Dropdown.Menu>
          </Dropdown>
          <Input
            icon
            size="small"
            placeholder="Search..."
            label={
              <Dropdown defaultValue="All" options={this.state.searchOptions} />
            }
          />
        </Menu.Item>

        <div className="right item">
          <div className="ui right pointing label">
            {this.state.greeting}
          </div>
          <a href="#">
            <h3><i className="user icon" /></h3>
          </a>
        </div>

      </Menu>
    );
  }
}
// BookRow.propTypes = {
//   title: React.PropTypes.string.isRequired,
//   author: React.PropTypes.string.isRequired,
// }
