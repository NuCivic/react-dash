import  'datatables.net-responsive-bs';
import  'datatables.net-responsive-bs/css/responsive.bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-grid';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-grid/dist/grid.min.css';
import Registry from '../utils/Registry';
import {getProp} from '../utils/utils';
import React, {Component} from 'react';
import BaseComponent from './BaseComponent';
import Card from './Card';
import Loader from './Loader';
import {isString, isEmpty, range, partialRight} from 'lodash';

export default class ResponsiveDataTable extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let data = this.props.data[0] || [];
    let keys = Object.keys(data[0]);
    let cols = [];

    keys.forEach(function(name) {
      var obj = {};
      obj.title = name;
      obj.data = name;
      cols.push (obj);
    });

    $(this.refs.main).DataTable({
      dom: '<"data-table-wrapper"t>',
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
  
  render() {
    
    const cardVars = this.getCardVariables() || {};
    
    return (
      <Card key={'card_'+this.state.key} {...cardVars} >
        <table ref="main" className="table-striped table-bordered table" />
      </Card>
    );
  }
}

Registry.set('ResponsiveDataTable', ResponsiveDataTable);
