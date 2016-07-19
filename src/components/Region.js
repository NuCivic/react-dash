// @@TODO - this should be replaced by a dash-level function that walks our settings tree
import React, { Component } from 'react';
import Registry from '../utils/Registry';
import {getOwnProps} from './Dashboard';

export default class Region extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log(this);
    return (
      <div className={this.props.className}>
        {this.props.children.map((element,key) => {
          return React.createElement(Registry.get(element.type), getOwnProps(this.props.location.query, key, this.props.children[key], this.props.reduxActions))
//          return React.createElement(Registry.get(element.type), Object.assign(this.props.children[key], reduxGlue))
        })}
      </div>
    );
  }
}

Registry.set('Region', Region);
