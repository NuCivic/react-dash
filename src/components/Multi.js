/*
 * This is not a reusable component. 
 * This is a simple pattern and should serve as a base
 * for development of custom components that intelligently
 * render children based on user input or certain logic
 */
import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import Card from './Card';

export default class Multi extends BaseComponent {
  renderChildren() {
    let curEls;
		let output;
 
    if (typeof this.state.data === 'string') { // Multi-component data should be a string
      curEls = this.props.elements[this.state.data];
    } else if (this.props.initVal) {
      curEls = this.props.elements[this.props.initVal];
    } else {
      return console.error('No valid key is defined in initVal or in data for elements object');
    }

 
    return curEls.map((element, key) => {
    			 let props = Object.assign(element, {globalData: this.props.globalData});
           if (element.cardStyle) {
              output =
               <Card key={key} {...element}>
                {React.createElement(Registry.get(element.type), props)}
               </Card>
           } else {
             output =
                React.createElement(Registry.get(element.type), props);
           }
					return output;
    });
  }
 
  /*
   * The render method, in this case, renders a select which triggers
   * our change listener. 
   * A helper function renders an array of elements from the appropriate
   * section of the multi component's settings
   */
  render() {
    let filters = this.getFilters();
    let v = 
    <div class="multi-container">
      {filters}
      <div class="multi-elements-container">
        {this.renderChildren()}
      </div>
    </div> 
    return v;
  }
}

Registry.set('Multi', Multi);
