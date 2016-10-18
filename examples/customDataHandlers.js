import DataHandler from '../src/utils/DataHandler'
import { find, min, max, mean } from 'lodash';

let customDataHandlers = {
  // Global data filters
  filterData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    let _data = componentData || pipelineData;
    let _newData;
    
    // let's clean up the data values a little
    _data.forEach(row => {
      let d = row.YearMonth.toString();
      let y = d.slice(0,4);
      let m = d.slice(4,7);
      let date = new Date(y,m);
      row.time = date.getTime();
    });

    if (!appliedFilters) return _data;
    
    Object.keys(appliedFilters).forEach(k => {
      if (k === "year" && appliedFilters[k].length >= 0) {
        _data =  _data.filter(row => {
          return _inYear(row, appliedFilters[k]);  
        })
      }
      
      if (k === "state" && appliedFilters[k].length >= 0) {
        let states = appliedFilters[k].map(parseInt);
        _data = _data.filter(row => {
          return _inState(row, states);  
        });
      }
    });
    
    return _data;
  },

  // @@DEPRECATE
  getMinTemp: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    let _data = dashboardData.map(r => { return r.TMIN });
    return [ min(_data) ];
  },

  getMaxTemp: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    let _data = dashboardData.map(r => { return r.TMAX });
    return [ max(_data) ];
  },

  getAvgTemp: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    let _data = dashboardData.map(r => { return parseFloat(r.TAVG) });
    return [ mean( _data ).toPrecision(4) ];
  },
  
  // @@TODO clean up NAN values
  getMapData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    let field = 'PHDI';
    let NaNRows = {};
    let mapped = dashboardData.map(row => {
      
      Object.keys(row).forEach((k) => {
        row[k] = parseFloat(row[k]);
        if (parseFloat(row[k]) === -99.99 )  row[k] = 0; // not sure the cause of this but ain't got time to sort it out
      });

      // assign label from stateArray to row, based on matching id
      let state = find(handler.stateArray, r => {
       return ( r.value === row.StateCode ) 
      });
      
      if (state) {
        row.name = state.label;
      }
      
      return row;
    });

    return mapped;
  },

  getBarChartData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    const colors = ['#e5f5e0', '#a1d99b', '#31a354'];
    return [
      {key: 'a', values: [{x: 1, y:1}, {x: 2, y:2 }], color: colors[0]},
      {key: 'b', values: [{x: 1, y:2}, {x: 2, y:5 }], color: colors[1]},
      {key: 'c', values: [{x: 1, y:3}, {x: 2, y:7 }], color: colors[2]}, 
    ]
  }
}

for (let k in customDataHandlers) {
  DataHandler.set(k, customDataHandlers[k]);
}

/**
 * Helpers
 **/
let _inYear = function (row, years) {
  let y = row.YearMonth.toString().substring(0,4);
  return (years.indexOf(y) >= 0);
}

let _inState = function (row, states) {
  return (states.indexOf(row.StateCode) >= 0);
}

export default customDataHandlers;
