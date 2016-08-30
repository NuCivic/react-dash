import React, { Component } from 'react';
import Registry from '../utils/Registry';
import Card from './Card';

export default class Region extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className={this.props.className}>
        {this.props.children.map((element,key) => {
           return (
           <Card key={key} {...element}>
            {React.createElement(Registry.get(element.type), this.props.children[key])}
           </Card>
          )
        })}
      </div>
    );
  }
}

Registry.set('Region', Region);
