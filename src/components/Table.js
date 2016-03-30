import React, { Component } from 'react';
import {Table as FixedTable, Column, Cell} from 'fixed-data-table';
import Registry from '../utils/Registry';
import {getProp} from '../utils/utils';
import Dataset from '../models/Dataset';
import isString from 'lodash/isString';
import range from 'lodash/range';
import partialRight from 'lodash/partialRight';

export default class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gridWidth: 1,
      gridHeight: 1,
      rowsPerPage: 10,
      currentPage: 1,
    };
    if(props.fetchData) {
      if(isString(props.fetchData)) {
        let records = this[this.props.fetchData]();
        let backend = {records: records};
        this.state.dataset = new Dataset(backend);
      } else {
        let backend = props.fetchData;
        this.state.dataset = new Dataset(backend);
      }
    }
  }

  componentDidMount(){
    this._attachResize();
    this._setSize();
    this.state.dataset.fetch().then(() => {
      let q = {
        size: this.state.rowsPerPage,
        from:  (this.state.currentPage * this.state.rowsPerPage) - this.state.rowsPerPage
      };

      this.state.dataset.query(q).then(this.onData.bind(this));
    });
  }

  onData(data) {
    this.setState({data: data.hits, total: data.total});
  }

  fetchData() {
    return Promise.resolve(this[this.props.fetchData]());
  }

  getPages(size, total, current) {
    let totalPages = this.getTotalPages(size, total);
    let displayedPages = 10;
    let centroid = displayedPages / 2;
    let start, end;

    if(current - centroid <= 0) {
      start = (current - centroid <= 0) ? 1 : current - centroid;
      end = Math.min(displayedPages + 1, totalPages);
    } else if(current + centroid > totalPages) {
      start = totalPages - displayedPages;
      end = (current + centroid > totalPages) ? totalPages + 1 : current + centroid;
    } else {
      start = current - centroid;
      end = current + centroid;
    }
    return range(start, end);
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

  setData(data) {
    const { offsetWidth, offsetHeight } = this.refs.table;
    let state = Object.assign({}, {
      gridWidth: offsetWidth,
      gridHeight: offsetHeight
    }, {data:data});

    this.setState(state);
  }

  _setSize() {
    const { offsetWidth, offsetHeight } = this.refs.table;
    this.setState({
      gridWidth: offsetWidth,
      gridHeight: offsetHeight
    });
  }

  _attachResize() {
    window.addEventListener('resize', this._setSize.bind(this), false);
  }

  _onPageChange(e, id, mouseEvent, pageNumber) {
    e.preventDefault();
    let rpp = this.state.rowsPerPage;
    let query = {
      size: rpp,
      from: (pageNumber * rpp) - rpp
    };
    this.state.dataset.query(query).then(this.onData.bind(this));
    this.setState({currentPage: pageNumber});
  }

  _onFilterChange(e) {
    //if (!e.target.value) this.setData(this.data);
    let rpp = this.state.rowsPerPage;
    let query = {
      size: rpp,
      from: (this.state.currentPage * rpp) - rpp,
      q: e.target.value
    };
    this.state.dataset.query(query).then(this.onData.bind(this));
  }

  render() {
    const { gridWidth, gridHeight } = this.state;
    let data = this.state.data || [];
    let tableDefaultProps = getProp('settings.table', this.props);
    let columnDefaultProps = getProp('settings.columns', this.props);
    let cellsDefaultProps = getProp('settings.cells', this.props);
    let headers = Object.keys(data[0] || {});
    let lastPage = this.getTotalPages(this.state.rowsPerPage, this.state.total);

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

    // Create the fixed data table.
    let table = (
      <FixedTable rowsCount={data.length} {...tableDefaultProps} width={gridWidth}>
        {columns}
      </FixedTable>
    );

    // Return the renderable elements
    return (
      <div ref="table">
        <input
          onChange={this._onFilterChange.bind(this)}
          placeholder="Filter"
          className="form-control"
        />
        {table}
        <nav>
          <ul className="pagination">
            <li className={(this.state.currentPage === 1) ? 'hide' : ''}>
              <a onClick={partialRight(this._onPageChange, this.state.currentPage - 1).bind(this)} href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {this.getPageNumbers(this.state.rowsPerPage, this.state.total, this.state.currentPage)}
            <li className={(this.state.currentPage === lastPage ) ? 'hide' : ''}>
              <a onClick={partialRight(this._onPageChange, this.state.currentPage + 1).bind(this)} href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

Registry.set('Table', Table);