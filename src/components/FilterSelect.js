import React, { Component } from 'react';

export default class FilterSelect extends Component {
  render() {
    console.log(this.props);
    return (
      <select class="filter=select">
        {
          this.props.vals.map(row => {
            return <option value={row.val}>{row.title}</option>
          })
        }
      </select>
    );
  }
}

