import React, { Component } from "react";
// import { Image } from 'semantic-ui-react';
import BarChart from "./BarChart";

export default class MapNetwork extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <BarChart data={[5, 10, 1, 3]} size={[500, 500]} />
        {/* {this.props.childrenData.map(child => (
          <Child
            key={child.childNumber}
            text={child.childText}
            onClick={e => this.handleChildClick(child, e)}
          />
        ))}*/}
        {/* <Image src="/img/network_view.png" />*/}
      </div>
    );
  }
}
