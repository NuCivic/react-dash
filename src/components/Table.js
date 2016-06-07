import React, { Component } from 'react';
import {Table as FixedTable, Column, Cell} from 'fixed-data-table';
import Registry from '../utils/Registry';
import {getProp} from '../utils/utils';
import Dataset from '../models/Dataset';
import BaseComponent from './BaseComponent';
import Loader from './Loader';
import {isString, isEmpty, range, partialRight} from 'lodash';

export default class Table extends BaseComponent {

  static defaultProps = {
    rowsPerPage: 10,
    queryObj: {
      size: 10,
      from: 0
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      gridWidth: 1,
      gridHeight: 1,
      rowsPerPage: this.props.rowsPerPage,
      currentPage: 1,
      queryObj: {
        size: this.props.queryObj.size,
        from: this.props.queryObj.from
      }
    };

  }

  componentDidMount(){
    super.componentDidMount();
  }

  getPages(size, total, current) {
    let totalPages = this.getTotalPages(size, total);
    let displayedPages = 10;
    let centroid = displayedPages / 2;
    let start, end;

    // If range is out of bounds to the left
    if(current - centroid <= 0) {
      start = (current - centroid <= 0) ? 1 : current - centroid;
      end = Math.min(displayedPages, totalPages);

    // If range is out of bounds to the right
    } else if(current + centroid > totalPages) {
      start = Math.max(totalPages - displayedPages, 1);
      end = (current + centroid > totalPages) ? totalPages : current + centroid;

    // If range is within bounds
    } else {
      start = current - centroid;
      end = current + centroid;
    }
    return range(start, end + 1);
  }

  getPageNumbers(size, total, current) {
    return this.getPages(size, total, current).map((pageNumber) => {
      return (
        <li
          className={(pageNumber == this.state.currentPage) ? 'active' : ''}
          key={'page-' + pageNumber}>
            <a
              onClick={partialRight(this._onPageChange, pageNumber).bind(this)}
              href="#">
              {pageNumber}
            </a>
        </li>
      );
    });
  }

  getLastPage(size, total) {
    let pages = getTotalPages(size, total);
    return pages[pages.length - 1];
  }

  getTotalPages(size, total){
    return Math.ceil(total / size);
  }

  onResize() {
    const { offsetWidth, offsetHeight } = this.refs.table;
    this.setState({
      gridWidth: offsetWidth,
      gridHeight: offsetHeight
    });
  }

  _onPageChange(e, id, mouseEvent, pageNumber) {
    e.preventDefault();
    let rpp = this.state.rowsPerPage;
    let query =  Object.assign({}, this.state.queryObj, {
      size: rpp,
      from: (pageNumber * rpp) - rpp
    });
    this.query(query);
    this.setState({currentPage: pageNumber, queryObj: query});
  }

  _onFilterChange(e) {
    let rpp = this.state.rowsPerPage;
    let query = Object.assign({}, this.state.queryObj, {
      size: rpp,
      from: (this.state.currentPage * rpp) - rpp,
      q: e.target.value
    });
    this.query(query);
    this.setState({currentPage: 1});
  }

  _onRowsPerPageChange(e) {
    let query = Object.assign({}, this.state.queryObj);
    query.size = Number(e.target.value);
    query.from = 0;
    this.query(query);
    this.setState({rowsPerPage: Number(e.target.value), currentPage: 1});
  }

  render() {
    const { gridWidth, gridHeight } = this.state;
    let data = this.getData() || [];
    let tableDefaultProps = getProp('settings.table', this.props);
    let columnDefaultProps = getProp('settings.columns', this.props);
    let cellsDefaultProps = getProp('settings.cells', this.props);
    let headers = Object.keys(data[0] || {});
    let totalPages = this.getTotalPages(this.state.rowsPerPage, this.state.total);
    let content;

    // Create the colums
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

    // Return the renderable elements
    return (

        <div ref="table">
          <div className="row">
            <div className="col-md-10">
              <div className="form-group">
                <input
                  onChange={this._onFilterChange.bind(this)}
                  placeholder="Filter"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-2">
              <div onChange={this._onRowsPerPageChange.bind(this)} className="form-group">
                <select className="form-control">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="500">500</option>
                </select>
              </div>
            </div>
          </div>
          <Loader isFeching={this.state.isFeching}>
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

    );
  }
}

Registry.set('Table', Table);