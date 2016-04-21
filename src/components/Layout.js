import React, { Component } from 'react';
import Chart from './Chart';
import Card from './Card';
import Registry from '../utils/Registry';

export default class Layout extends Component {
  renderRegion(elements){
    if (!elements) return;
    return elements.map((element, key) => {
      let props = Object.assign({globalData:this.props.globalData}, element);
      // Attach global state and contexts to nested components
      return (
        <Card key={key} {...element}>
          {React.createElement(Registry.get(element.type), props)}
        </Card>
      );
    });
  }
}

Registry.set('Layout', Layout);