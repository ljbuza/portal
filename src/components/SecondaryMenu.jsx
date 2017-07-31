import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import MenuItems from "../data/SecMenuItems.json";

export default class SecondaryMenu extends Component {
  render(props) {
    return (
      <div>
        <Menu pointing secondary>
          {MenuItems[this.props.section].map(({ name, to }, index) => (
            <Menu.Item key={index} name={name} as={NavLink} to={to} />
          ))}
        </Menu>
      </div>
    );
  }
}
