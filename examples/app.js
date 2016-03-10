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
      /**
       * This should call getAppData with appropriate args
       * @@TODO flux/redux actions
       */
      onAutocompleteChange: (value) => console.log(value),
      /**
       * Define initial configs
       **/
      initConfig: {url: 'http://demo.getdkan.com/sites/default/files/us_foreclosures_j    an_2012_by_state_0.csv'},
      /**
       * Define a method to retrieve app data
       **/
      getAppData: (args, cb) => {
        CSV.fetch(args).then(data => {
          console.log("getAppDate", args);
          cb(data);
        });
      },
      
      /**
       * Add cardDataHandlers here
       * cardDataHandlers are called in store.js
       * and can access appData
       **/
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
      },
      getChartTopData: function (args, data) {
        console.log('Top', args, data);    
        return [{
          key: 'Foobar',
          values: [
            {
              label: 'foo',
              value: 10
            },
            {
              label: 'foo',
              value: 11
            },
            {
              label: 'foo',
              value: 12
            },
            {
              label: 'foo',
              value: 13
            },
            {
              label: 'foo',
              value: 14
            }
          ]
        }];
      },
      getChartLeftData: function (args, data) {
        console.log('Left', this, args, data);
        return [{
          key: 'Foobar',
          values: [
            {
              label: 'foo',
              value: 100
            },
            {
              label: 'foo',
              value: 110
            },
            {
              label: 'foo',
              value: 120
            },
            {
              label: 'foo',
              value: 130
            },
            {
              label: 'foo',
              value: 140
            }
          ]
        }];
      },
      getChartRightData: function (args, data) {
        console.log('Right', args, data);
        return [{
          key: 'Foobar',
          values: [
            {
              label: 'foo',
              value: 1000
            },
            {
              label: 'foo',
              value: 2000
            },
            {
              label: 'foo',
              value: 3000
            },
            {
              label: 'foo',
              value: 4000
            },
            {
              label: 'foo',
              value: 5000
            }
          ]
        }];
      },
      getChartBottomData: function (args, data) {
        console.log('Bottom', args, data);
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
