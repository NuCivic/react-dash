import React, { Component } from 'react';
import BaseComponent from './BaseComponent';

export default class FilterSelect extends BaseComponent {
  render() {
    console.log('filter', this.props);
    let html = <select class="filter-select">
                <option value='opt1'>Option 1</option>
                <option value='opt2'>Option 2</option>
               </select>
    return html;
  }
}

