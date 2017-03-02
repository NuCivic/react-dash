import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';

export default class Highlight extends BaseComponent {
  render() {
    let cols = this.props.data[0].cols || [];
    let key = this.makeKey();

    return (
      <div className="highlight" key={key}>
        { cols.map( (col, i) => {
            return <div className={"highlight-col highlight-cols-" + cols.length} key={i}>
              { col.rows.map( (row, j) => {
                return <div className="highlight-row" key={j}>
                  <span className="highlight-label">{ row.label }</span>
                  <span className="highlight-val">{ row.val }</span>
                </div>
              }) }
          </div>
        }) }
      </div>
     )
  }
}

Registry.set('Highlight', Highlight);
