import React, { Component } from 'react';
import {Table as FixedTable, Column, Cell} from 'fixed-data-table';
import Registry from './Registry';
import {execute, getProp} from './utils';

export default class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gridWidth: 1,
      gridHeight: 1
    };
  }

  componentDidMount(){
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
    const { gridWidth, gridHeight } = this.state;
    let tableDefaultProps = getProp('settings.table', this.props);
    let columnDefaultProps = getProp('settings.columns', this.props);
    let cellsDefaultProps = getProp('settings.cells', this.props);
    let data = execute(this.props.data, this.props.context);
    let headers = Object.keys(data[0]);
    let columns = headers.map((header) => {
      let overrides = getProp('overrides.' + header, columnDefaultProps);
      return <Column
        header={<Cell>{header}</Cell>}
        key={header}
        columnKey={header}
        cell={props => {
          let overrides = getProp('overrides.' + props.rowIndex, cellsDefaultProps);
          return <Cell {...props} {...cellsDefaultProps} {...overrides}>
            {data[props.rowIndex][props.columnKey]}
          </Cell>
        }}
        {...columnDefaultProps}
        {...overrides}
      />
    });

    return (
      <div ref="table">
        <FixedTable rowsCount={data.length} {...tableDefaultProps} width={gridWidth}>
          {columns}
        </FixedTable>
      </div>
    );
  }
}

Registry.set('Table', Table);