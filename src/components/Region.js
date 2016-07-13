import React, { Component } from 'react';
import Registry from '../utils/Registry';

export default class Region extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let reduxGlue = {
      appFilterParams: this.props.appFilterParams,
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
