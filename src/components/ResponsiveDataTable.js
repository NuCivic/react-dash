import 'datatables.net-responsive-bs';
import Registry from '../utils/Registry';
import {getProp} from '../utils/utils';
import React, {Component} from 'react';
import BaseComponent from './BaseComponent';
import Card from './Card';
import Loader from './Loader';
import {isString, isEmpty, isArray} from 'lodash';
import $ from 'jquery';

export default class ResponsiveDataTable extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {};
  }

  getDataFromProps() {
    let data = [];
    if (isArray(this.props.data[0]) && this.props.data.length > 0) {
      data = this.props.data[0];
    }
    return data;
  }

  prepareDataCols(data) {
    let cols = [];
    let keys;
    keys = (isArray(data) && data.length > 0) ? Object.keys(data[0]) : [];
    keys.forEach(function(name) {
      let obj = {};
      obj.data = name;
      obj.title = name;
      cols.push (obj);
    });
    return cols;
  }

  clearDataTable() {
    let tableEl = $(this.refs.main);
    tableEl.DataTable().clear().draw();
  }

  buildDataTable(data) {
    const tableEl = $(this.refs.main);
    const cols = this.prepareDataCols(data);
    const that = this;
    tableEl.DataTable({
      columnDefs: [{
        "targets": "_all",
        createdCell: function(td, cellData, rowData, row, col) {
          const header = Object.keys(rowData)[col];

          const  columnOverrides = getProp('columns.' + header,
                                           that.props.overrides);
          const cellOverrides = getProp('cells.' + header + '_' + row,
                                        that.props.overrides);
          if (!isEmpty(columnOverrides)) {
            $(td).addClass(columnOverrides.className);
          }
          if (!isEmpty(cellOverrides)) {
            $(td).addClass(cellOverrides.className);
          }
        }
      }],

      dom: '<"datatablewrapper"t>',
      "paging":   false,
      "ordering": false,
      "info":     false,
      searching: false,
      autoWidth: false,
      data: data,
      "columns": cols,
      responsive:  {
        details: {
          display: $.fn.dataTable.Responsive.display.childRowImmediate,
          type: ''
        }
      }
    });
  }

  updateDataTable(data) {
    let dt = $(this.refs.main).DataTable();
    dt.rows.add(data);
    dt.columns.adjust().draw();
  }

  componentDidUpdate(prevProps, prevState) {

    const data = this.getDataFromProps();

    // Do we have data? If not, return;
    if ((typeof data === 'undefined') || (data.length < 1)) {
      return;
    }

    // We have data:
    // Now, see if we already have a DataTable in the DOM.
    if ($.fn.DataTable.isDataTable(this.refs.main)) {
      this.clearDataTable();
      this.updateDataTable(data);
    } else {
      this.buildDataTable(data);
    }

    return;
  }

  render() {
    const cardVars = this.getCardVariables() || {};
    return (
      <Card key={'card_'+this.state.key} {...cardVars} >
        <Loader isFetching={this.props.isFetching}>
          <table ref="main" className="table-striped table-bordered table" />
        </Loader>
      </Card>
    );
  }
}

Registry.set('ResponsiveDataTable', ResponsiveDataTable);
