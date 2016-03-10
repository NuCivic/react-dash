import React, { Component } from 'react';
import Dashboard from '../src/Dashboard';
import Autocomplete from '../src/Autocomplete';
import Geary from '../src/layouts/Geary';
import Table from '../src/Table';
import {datum} from './datum';
import {store} from './store';
import CSV from './csv';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange(value) {
    console.log(value);
  }

  getContext() {
    return {
      getData: (data) => datum,
      onAutocompleteChange: (value) => console.log(value),
      getAppData: (args, cb) => {
        CSV.fetch(args).then(data => {
          console.log("getAppDate", args);
          cb(data);
        });
      },
      getTableData: () => {
        return [
          {
            a1: 'a2',
            b1: 'b2',
            c1: 'c2',
          },
          {
            a1: 'a3',
            b1: 'b3',
            c1: 'c3',
          }
        ];
      }
    }
  }

  render() {
    return (
      <div>
        <Dashboard context={this.getContext()} sharedState={this.state} {...store} layout={Geary}/>
      </div>
    );
  }
}
