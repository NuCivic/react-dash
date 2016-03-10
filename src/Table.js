import React, { Component } from 'react';
import {Table as FixedTable, Column, Cell} from 'fixed-data-table';
import Registry from './Registry';
import {execute} from './utils';
import omit from 'lodash/omit';
import property from 'lodash/property';


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
    let tableDefaultProps = omit(property('table')(this.props), 'columns');
    let columnDefaultProps = omit(property('table.columns')(this.props), 'cells');
    let cellsDefaultProps = property('table.columns.cells')(this.props);

    const { gridWidth, gridHeight } = this.state;
    let data = execute(this.props.data, this.props.context);
    let headers = Object.keys(data[0]);
    let columns = headers.map((header) => {
      return <Column
        header={<Cell>{header}</Cell>}
        key={header}
        columnKey={header}
        cell={props => (
          <Cell {...props}>
            {data[props.rowIndex][props.columnKey]}
          </Cell>
        )}
        flexGrow={1}
        width={150}
      />
    });

    return (
      <div ref="table">
        <FixedTable rowsCount={data.length} {...this.props} width={gridWidth}>
          {columns}
        </FixedTable>
      </div>
    );
  }
}

Registry.set('Table', Table);