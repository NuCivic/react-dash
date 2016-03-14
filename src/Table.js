import React, { Component } from 'react';
import {Table as FixedTable, Column, Cell} from 'fixed-data-table';
import Registry from './Registry';
import {execute, getProp} from './utils';
import {FetchData} from './FetchData';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gridWidth: 200,
      gridHeight: 200
    };
  }

  componentDidMount(){
    console.log(this.refs);
    this.attachResize();
    this.setSize();
  }

  setSize() {
    const { offsetWidth, offsetHeight } = this.refs.table;
    this.setState({
      gridWidth: offsetWidth,
      gridHeight: offsetHeight
    });
  }

  attachResize() {
    window.addEventListener('resize', this.setSize.bind(this), false);
  }

  render() {
    if(!this.props.data.length) return (<div ref="table"></div>);

    const { gridWidth, gridHeight } = this.state;
    let tableDefaultProps = getProp('settings.table', this.props);
    let columnDefaultProps = getProp('settings.columns', this.props);
    let cellsDefaultProps = getProp('settings.cells', this.props);
    let headers = Object.keys(this.props.data[0]);
    let columns = headers.map((header) => {
      let overrides = getProp('overrides.' + header, columnDefaultProps);
      return <Column
        header={<Cell>{header}</Cell>}
        key={header}
        columnKey={header}
        cell={props => {
          let overrides = getProp('overrides.' + props.rowIndex, cellsDefaultProps);
          return <Cell {...props} {...cellsDefaultProps} {...overrides}>
            {this.props.data[props.rowIndex][props.columnKey]}
          </Cell>
        }}
        {...columnDefaultProps}
        {...overrides}
      />
    });

    return (
      <div ref="composed">
        <FixedTable rowsCount={this.props.data.length} {...tableDefaultProps} width={gridWidth}>
          {columns}
        </FixedTable>
      </div>
    );
  }
}

let AsyncTable = FetchData(Table);
Registry.set('Table', AsyncTable);
export default AsyncTable;