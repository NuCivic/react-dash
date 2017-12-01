import { DataHandler } from '../src/ReactDashboard'
import { find, min, max, mean, isArray } from 'lodash';

let customDataHandlers = {
  getClimateMetric: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    let data = dashboardData.climateData;
    let output;

    if (isArray(data) && data.length > 0) {
      if (handler.field === 'TMIN') {
        output = data.map(r => { return r.TMIN });
        return [min(output)]
      }
      
      if (handler.field === 'TMAX') {
        output = data.map(r => { return r.TMAX });
        return [max(output)]
      }

      if (handler.field === 'TAVG') {
        output = data.map(r => { return parseInt(r.TAVG) });
        return [mean(output).toPrecision(4)];
        let n = mean(output).toPrecision(4);
        return [n];
      }
    }
    
    return ["..."];
  },

  // @@TODO clean up NAN values
  getMapData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    let field = 'PHDI';
    let NaNRows = {};
    let _data = dashboardData.climateData;
    let mapped;
    
    if (_data && _data.length > 0) {
      mapped = _data.map(row => {
        
        Object.keys(row).forEach((k) => {
          row[k] = Number(row[k]);
          if (row[k] === -99.99 )  row[k] = 0; // not sure the cause of this but ain't got time to sort it out
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
    }

    return mapped;
  },

  getBarChartData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    const indicators = [ 'SP01', 'SP06', 'SP12', 'SP24' ];
    const colors = [
      '#edf8fb',
      '#ccece6',
      '#99d8c9',
      '#66c2a4',
      '#2ca25f',
      '#006d2c',
    ];
    let _data = dashboardData.climateData || [];
    let series = indicators.map((ind, i) => {
      let data = _data.map(row => {
        return {
          x: row['YearMonth'],
          y: row[ind]
        }
      }).filter(row => {
        return (!isNaN(row.y) && row.y > -10 && row.y < 10);
      });
      return {key: ind, values: data, color: colors[i]}
    });

    return series;
  },



 // @TODO use data with dashboardData.
  getTableData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {

    //const data = dashboardData.climateData || [];


    const d = [
      {
        "year": 2000,
        "min": 0.42,
        "max": 0.52
      },
      {
        "year": 2001,
        "min": 0.55,
        "max": 0.54
      },
      {
        "year": 2002,
        "min": 0.63,
        "max": 0.56
      },
      {
        "year": 2003,
        "min": 0.62,
        "max": 0.59
      },
      {
        "year": 2004,
        "min": 0.55,
        "max": 0.61
      },
      {
        "year": 2005,
        "min": 0.69,
        "max": 0.62
      },
      {
        "year": 2006,
        "min": 0.63,
        "max": 0.62
      },
      {
        "year": 2007,
        "min": 0.66,
        "max": 0.63
      },
      {
        "year": 2008,
        "min": 0.54,
        "max": 0.63
      },
      {
        "year": 2009,
        "min": 0.64,
        "max": 0.63
      },
      {
        "year": 2010,
        "min": 0.71,
        "max": 0.63
      },
      {
        "year": 2011,
        "min": 0.6,
        "max": 0.65
      },
      {
        "year": 2012,
        "min": 0.63,
        "max": 0.68
      },
      {
        "year": 2013,
        "min": 0.65,
        "max": 0.74
      },
      {
        "year": 2014,
        "min": 0.74,
        "max": 0.79
      },
      {
        "year": 2015,
        "min": 0.87,
        "max": 0.85
      },
      {
        "year": 2016,
        "min": 0.99,
        "max": 0.91
      }
    ];


      return  [d];
 

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
