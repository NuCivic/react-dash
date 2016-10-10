import DataHandler from '../src/utils/DataHandler'
import { find } from 'lodash';

let customDataHandlers = {
  // Global data filters
  filterData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    let _data = componentData || pipelineData;
    let _newData;
    
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

  getNumRecords: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    return [dashboardData.length];
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
