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
          let output;
           let props = Object.assign(element, {globalData: this.props.globalData}); 
           if (element.cardType !== 'undefined') {
              output =
               <Card key={key} {...element}>
                {React.createElement(Registry.get(element.type), props)}
               </Card>
           } else {
             output =
                React.createElement(Registry.get(element.type), props);
           }
           return output;
        })}
      </div>
    );
  }
}

Registry.set('Region', Region);
