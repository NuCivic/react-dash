/** 
 * Our custom Dashboard app
 **/
import React, { Component } from 'react';
import { settings } from './settings';
import { Router, Route, browserHistory } from 'react-router';
import { Dashboard, Dataset } from '../src/ReactDashboard';
import { omit } from 'lodash';

class Dash extends Dashboard {
  /**
   * Dashboard implementations need to provide this method
   * which should:
   * 1. set state.data based on props.dataResources
   * 2. set state.fetching = false when it's finished
   */
  getDashboardData(_appliedFilters) {
    let dashData = Object.assign({}, this.state.data);
    let dataKeys = Object.keys(this.props.dataResources);
    let appliedFilters = _appliedFilters || Object.assign({}, this.state.appliedFilters);
    
    dataKeys.forEach(dataKey => {
      let filters = this.getFilters(dataKey, appliedFilters);
      
      this.fetchBackend(this.props.dataResources[dataKey]).then(data => {
      
        dashData[dataKey] = this.applyFilters(data.hits, filters);  
        if (Object.keys(dashData).length === dataKeys.length) {
          this.setState({data: dashData, isFetching: false});
        }
      }).catch(e => {
        console.log('Error fetching dashboard data', e);
      });  
    });
  }

  /**
   * Custom helper
   *
   * Use backends to fetch data and query the result
   */
  fetchBackend(fetcher) {
    return new Promise((resolve, reject) => {
      let dataset = new Dataset(omit(fetcher.fetchData, 'type'));
      let queryObj = this.state.queryObj;
      this.setState({isFetching: true, dataset: dataset});
      dataset.fetch().then((data) => {
        this.state.dataset.query(queryObj).then(queryRes => {
          resolve(queryRes);
        })
      }).catch(e => {
          reject(e);
      });
    });
  }

  // A bit of a trivial example of how to use filters to return filtered data
  applyFilters(data, filters) {
    let _data = data.slice(0), filterVal;
    
    // perform required filtering based on filters obj 
    // In this case we need to compare the year value with the YearMonth value as strings
    if (filters && filters.length > 0) {
      filters.forEach(f => {
        if (f.field === 'YearMonth') {
          filterVal = f.value[0].value || f.value[0];
          _data = _data.filter(row => {
            return row.YearMonth.toString().indexOf(filterVal.toString()) >= 0;
          })          
        }
      }); 
    }
    
    return _data;
  }
}
console.log('1', Dash);

// Now wrap the Dashboard so we can pass Routing info from the App
class MyDashboard extends Component {
  render() {
    let z = {};
    z.appliedFilters = (this.state) ? this.state.appliedFilters : {};
    const props = Object.assign({}, this.props, z, _settings);
    return <Dash {...props}/>
  }
}

console.log(2, MyDashboard);

// Wrap Dashboard component in router
class MyDash extends Component {
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

console.log(3, MyDash);

export default MyDash;
