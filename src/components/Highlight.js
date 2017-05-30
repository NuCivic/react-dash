import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import Card from './Card';

export default class Highlight extends BaseComponent {
  render() {
    let cols = this.props.data[0].cols || [];
    let key = this.makeKey();

    return (
      <Card {...this.state.cardVariables}>
        <div className="highlight" key={key}>
          { cols.map( (col, i) => {
              return <div className={"highlight-col highlight-cols-" + cols.length} key={i}>
                { col.rows.map( (row, j) => {
                  let labelVal = <span className="highlight-label">{ row.label }</span>;
                  let rowVal;
                  
                  if (row.isLink) {
                    rowVal = <span className="highlight-val">
                               <a href={row.val}>{row.val}</a>
                             </span> 
                  } else {
                    rowVal = <span className="highlight-val">{ row.val }</span>  
                  }
                  
                  return (
                    <div className="highlight-row" key={j}>
                      {labelVal}{rowVal}
                    </div>
                 )
                }) }
            </div>
          }) }
        </div>
      </Card>
     )
  }
}

Registry.set('Highlight', Highlight);
