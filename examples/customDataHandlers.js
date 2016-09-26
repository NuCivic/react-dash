import DataHandler from '../src/utils/DataHandler'
import last from 'lodash/last';

let customDataHandlers = {
  // Global data filters
  filterData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    let _data = componentData || pipelineData;
    let _newData;
    
    if (!appliedFilters) return _data;
    
    Object.keys(appliedFilters).forEach(k => {
      if (k === "year") {
          _data =  _data.filter(row => {
          return _inYear(row, appliedFilters[k]);  
        })
      }
      
      if (k === "state") {
        let states = appliedFilters[k].map(parseInt);
           _data = _data.filter(row => {
          return _inState(row, states);  
        });
      }
    });
    console.log('D', _data.length);
    
    return _data;
  },
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
  console.log(states.indexOf(row.StateCode) >= 0);
  return (states.indexOf(row.StateCode) >= 0);
}

export default customDataHandlers;
