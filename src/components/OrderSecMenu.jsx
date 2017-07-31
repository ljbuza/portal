import React, { Component } from "react";
import { Link, browserHistory } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default class OrderSecMenu extends Component {
  state = { activeItem: "orders" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    browserHistory.push({ pathname: "/orders" });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="orders"
            as={Link}
            to="/orders"
            active={activeItem === "orders"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </div>
    );
  }
}
