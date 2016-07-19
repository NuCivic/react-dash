// @@TODO - this should be replaced by a dash-level function that walks our settings tree
import React, { Component } from 'react';
import Registry from '../utils/Registry';
import {getOwnProps} from './Dashboard';

export default class Region extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let reduxGlue = {
      reduxState: this.props.reduxState,
      reduxActions: this.props.reduxActions

    }
    return (
      <div className={this.props.className}>
        {this.props.children.map((element,key) => {
          return React.createElement(Registry.get(element.type), Object.assign(this.props.children[key], reduxGlue))
        })}
      </div>
    );
  }
}

Registry.set('Region', Region);
