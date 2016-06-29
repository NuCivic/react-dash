import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';

export default class Div extends BaseComponent {
  constructor(props) {
    super(props);
    console.log('DIV>>',this.props);
  }
  
  render() {
    console.log("DIV", this.props);
    return (
      <div className="{this.props.className}">
        {this.props.children.map((element,key) => {
          return React.createElement(Registry.get(element.type), this.props.children[key])
        })}
      </div>
    );
  }
}

Registry.set('Div', Div);
