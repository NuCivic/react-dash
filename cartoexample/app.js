import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { settings } from './settings';
import { Router, Route, browserHistory } from 'react-router';
import { Dashboard, Dataset } from '../src/ReactDashboard';
let _settings;
import { omit } from 'lodash';

// get settings object from global, if available
if (typeof expressDashSettings != "undefined") {
   _settings = expressDashSettings;
} else {
  _settings = settings;
}

// Extend Dashboard with our data fetch logic
// @@TODO - this is a good case for a higher order function as mariano discussed
class Dash extends Dashboard {
  getDashboardData() {
    let dashData = Object.assign({}, this.state.data);
    let dataKeys = Object.keys(this.props.dataResources);

    dataKeys.forEach(dataKey => {
      let filters = this.getFilters(dataKey);
      this.fetchBackend(this.props.dataResources[dataKey]).then(data => {
        // Note that, because of the shape of our data and the need for custom processing, that we do our filtering AFTER we fetch. In other cases (The DKAN Dash implementation for example),  we use the appropriate filters to update our API calls to return filtered data. The details of implementation are up to you, but we suggest you stick with the appliedFilters pattern, which maintains a FLUX/ish top down data flow
        console.log(data);
        dashData[dataKey] = this.applyFilters(data.rows, filters);
        if (Object.keys(dashData).length === dataKeys.length) {
          this.setState({data: dashData});
        }
      }).catch(e => {
        console.log('Error fetching dashboard data', e);
      });
    });
  }

  /**
   * Use backends to fetch data and query the result
   */
  fetchBackend(fetcher) {
    return new Promise((resolve, reject) => {
      let dataset = new Dataset(omit(fetcher.fetchData, 'type'));
      console.log(dataset);
      let queryObj = this.state.queryObj;
      this.setState({isFeching: true, dataset: dataset});
      if (dataset.settings.backend == 'cartodb') {
        console.log("THIS ONE IS CARTO");
        dataset.fetch().then((data) => {
          console.log('DATA', data);
          resolve(data);
        }).catch(e => {
            reject(e);
        });
      }
      else {
        console.log("THIS ONE IS NOT");
        dataset.fetch().then((data) => {
          this.state.dataset.query(queryObj).then(queryRes => {
            resolve(queryRes);
          })
        }).catch(e => {
            reject(e);
        });
      }
    });
  }

  // A bit of a trivial example of how to use filters to return filtered data
  applyFilters(data, filters) {
    let _data = data.slice(0), filterVal;

    // perform required filtering based on filters obj
    // In this case we need to compare the year value with the YearMonth value as strings
    if (filters && filters.length > 0) {
      filters.forEach(f => {
        if (f.yearmonth) {
          filterVal = filters[0].yearmonth[0];
          _data = _data.filter(row => {
            return row.yearmonth.toString().indexOf(filterVal.toString()) >= 0;
          })
        }
      });
    }

    return _data;
  }
}

// Now wrap the Dashboard so we can pass Routing info from the App
class MyDashboard extends Component {
  render() {
    let z = {};
    z.appliedFilters = (this.state) ? this.state.appliedFilters : {};
    const props = Object.assign({}, this.props, z, _settings);
    return <Dash {...props}/>
  }
}

// Wrap Dashboard component in router
class App extends Component {
  render() {
    return (
      <div id="router-container">
        <Router history={browserHistory}>
          <Route path='*' component={MyDashboard} />
          <Route path='/react-dashboard' component={MyDashboard} />
        </Router>
      </div>
    )
  }
}

// Now put it in the DOM!
document.addEventListener('DOMContentLoaded', function(event) {
    ReactDOM.render(<App/>, document.getElementById('root'));
});
