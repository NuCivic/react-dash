import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import Card from './Card';

export default class Highlight extends BaseComponent {
  render() {
    let cols = this.props.data[0].cols || [];

    const existy = (obj) => {
      return obj != null;
    };

    return (
      <Card {...this.state.cardVariables}>
        <div className="highlight">
          { cols.map( (col, i) => {
              return <div className={"highlight-col highlight-cols-" + cols.length} key={i}>
                { col.rows.map( (row, j) => {
                  let output = [];
                  // Create label & val keys by stripping spaces from their values and appending the map index.
                  let labelKey = (row.label.replace(/\s/g,'-')).toLowerCase() + j;
                  let valKey = (row.val.slice(0,8)).replace(/\s/g,'-').toLowerCase() + j;

                  if (row.isLink) {
                    let label = existy(row.label);
                    let value = existy(row.val);
                    let url = existy(row.url);

                    switch (true) {
                      case (label && value && url) :
                        output.push(<span className="highlight-label" key={labelKey}>{ row.label }</span>);
                        output.push(<span className="highlight-val" key={valKey}>
                          <a href={ row.url }>{ row.val }</a>
                        </span>);
                        break;
                      case (!label && value && url):
                        output.push(<span className="highlight-val" key={valKey}>
                          <a href={ row.url }>{ row.val }</a>
                        </span>);
                        break;
                      case (label && !value && url):
                        output.push(<span className="highlight-val" key={labelKey}>
                          <a href={ row.url }>{ row.label }</a>
                        </span>);
                        break;
                      case ((label || value) && !url):
                        output.push(<span className="highlight-val" key={row.val ? valKey : labelKey}>
                               <a href={row.val ? row.val : row.label}>{ row.label ? row.label : row.val}</a>
                             </span>);
                        break;
                      default:
                        console.log('invalid or empty row values.')
                    }

                  } else {
                    output.push(<span className="highlight-label" key={labelKey}>{ row.label }</span>);
                    output.push(<span className="highlight-val" key={valKey}>{ row.val }</span>)
                  }
                  return (
                    <div className="highlight-row" key={j}>
                      {output}
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
