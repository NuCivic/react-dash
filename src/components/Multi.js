import React from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import Card from './Card';

export default class Multi extends BaseComponent {
  renderChildren() {
    let curEls;
    let output;

    if (typeof this.props.data === 'string') {
      curEls = this.props.elements[this.props.data];
    } else if (this.props.initVal) {
      curEls = this.props.elements[this.props.initVal];
    } else {
      return console.error('No valid key is defined in initVal or in data for elements object');
    }

    return curEls.map((element, key) => {
      const props = Object.assign(element, { globalData: this.props.globalData });

      if (element.cardStyle) {
        output =
          (
            <Card key={key} {...element}>
              {React.createElement(Registry.get(element.type), props)}
            </Card>
          );
      } else {
        output =
          React.createElement(Registry.get(element.type), props);
      }

      return output;
    });
  }

  render() {
    const v =
    (
      <div className="multi-container">
        <div className="multi-elements-container">
          {this.renderChildren()}
        </div>
      </div>
    );

    return v;
  }
}

Registry.set('Multi', Multi);
