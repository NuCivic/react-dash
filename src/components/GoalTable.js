import {Table as FixedTable, Column, Cell} from 'fixed-data-table';
import Registry from '../utils/Registry';
import React, {Component} from 'react';
import {getProp} from '../utils/utils';
import Card from './Card';
import Loader from './Loader';
import DataTable from './DataTable';
import { partialRight } from 'lodash';

export default class GoalTable extends DataTable {
  render() {
    const { gridWidth, gridHeight } = this.state;
    let data = this.props.data[0] || [];
    let tableDefaultProps = getProp('settings.table', this.props);
    let columnDefaultProps = getProp('settings.columns', this.props);
    let cellsDefaultProps = getProp('settings.cells', this.props);
    let headers = Object.keys(data[0] || {});
    let totalPages = this.getTotalPages(this.state.rowsPerPage, this.state.total);
    let content;

    // Create the colums
    let columns = headers.map((header, headerIndex) => {
      let overrides = getProp('overrides.' + header, columnDefaultProps);
      return <Column
        header={<Cell>{header}</Cell>}
        key={header + headerIndex}
        columnKey={header}
        flexGrow={1}
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

    // Return the renderable elements
    return (
      <Card key={'card_'+this.state.key} {...this.state.cardVariables}>
        <div ref="table">
          <Loader isFetching={this.state.isFetching}>
            <div className="table-container">
              <FixedTable rowsCount={data.length} {...tableDefaultProps} width={gridWidth}>
                {columns}
              </FixedTable>
            </div>

            <nav>
              <ul className="pagination">

                <li className={(this.state.currentPage === 1) ? 'hide' : ''}>
                  <a onClick={partialRight(this._onPageChange, 1).bind(this)} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                <li className={(this.state.currentPage === 1) ? 'hide' : ''}>
                  <a onClick={partialRight(this._onPageChange, this.state.currentPage - 1).bind(this)} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {this.getPageNumbers(this.state.rowsPerPage, this.state.total, this.state.currentPage)}

                <li className={(!totalPages || this.state.currentPage === totalPages ) ? 'hide' : ''}>
                  <a onClick={partialRight(this._onPageChange, this.state.currentPage + 1).bind(this)} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>

                <li className={(!totalPages || this.state.currentPage === totalPages ) ? 'hide' : ''}>
                  <a onClick={partialRight(this._onPageChange, totalPages).bind(this)} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>

              </ul>
            </nav>
          </Loader>
        </div>
      </Card>
    );
  }
}

Registry.set('GoalTable', GoalTable);
