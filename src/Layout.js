import React, { Component } from 'react';
import Chart from './Chart';
import Card from './Card';
import Registry from './Registry';

export default class Layout extends Component {
  renderRegion(elements){
    if (!elements) return;
    return elements.map((element, key) => {
      let props = Object.assign({}, element);
      // Attach global state and contexts to nested components
      props.sharedState = this.props.sharedState;
      props.context = this.props.context;
      return (
        <Card key={key} {...element}>
          {React.createElement(Registry.get(element.type), props)}
        </Card>
      );
    });
  }
}

Registry.set('Layout', Layout);