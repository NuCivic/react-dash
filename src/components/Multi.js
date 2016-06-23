/*
 * This is not a reusable component. 
 * This is a simple pattern and should serve as a base
 * for development of custom components that intelligently
 * render children based on user input or certain logic
 *
 * See the GAMultiSelect component in the examples directory 
 * for an example of a simple implementation
 */
import React, { Component } from 'react';
import Registry from '../utils/Registry';

export default class Multi extends Component {
  /*
   * Define initial set of elements to render
   * Use settings > yourComponent.initialElement 
   * or override function with your own logic
   */
  componentWillMount() {
    const initVal = this.props.initialSelection;
    if (initVal) {
      this.setState({elements : this.props.elements[initVal]});
    }
  }

  /*
   * Loop through and render the current state.elements array
   */
  renderChildren() {
    let els = [];
    if (this.state && this.state.elements) {
      this.state.elements.map((element) => {
        els.push(React.createElement(Registry.get(element.type), element));
      });
    }
    return els;
  }
}

Registry.set('Multi', Multi);
