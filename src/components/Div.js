import React, { Component } from 'react';
import Registry from '../utils/Registry';

export default class Div extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className={this.props.className}>
        {this.props.children.map((element,key) => {
          return React.createElement(Registry.get(element.type), this.props.children[key])
        })}
      </div>
    );
  }
}

Registry.set('Div', Div);
