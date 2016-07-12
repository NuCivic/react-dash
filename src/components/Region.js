import React, { Component } from 'react';
import Registry from '../utils/Registry';

export default class Region extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className={this.props.className}>
        {this.props.children.map((element,key) => {
          return React.createElement(Registry.get(element.type), Object.assign(this.props.children[key], {query: this.props.query}))
        })}
      </div>
    );
  }
}

Registry.set('Region', Region);
