import React, { Component } from 'react';
import Registry from '../utils/Registry';

/** 
 * DOC:
 * The **select** component takes the following values:
 * defaultValue (optional) : a default select value
 * options: an array of objects in the following format:
 * '''javascript
 *   [
 *     {
 *       name: 'Foo',
 *       value: 'Bar'
 *     },
 *     {
 *       name: 'Ick',
 *       value: 'Ban'
 *     }
 *   ]
 * '''
 * onChnage: a function to call on input change (should --probably-- be bound to parent)
 */
export default class Select extends Component {
  render() {
    console.log('SS', this.props);
    return (
      <select value={this.props.defaultValue} onChange={this.props.onChange}>
        {this.props.options.map(opt => {
          return <option value={opt.value}>{opt.name}</option>
        })}
      </select>
    )
  }
}

Registry.set('Select', Select);
