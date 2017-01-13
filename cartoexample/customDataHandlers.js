import { DataHandler } from '../src/ReactDashboard'
import { find, min, max, mean, isArray } from 'lodash';

let customDataHandlers = {
  // Global data filters
  filterData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    let _data = componentData || pipelineData;

    // let's clean up the data values a little
    _data.forEach(row => {
      let d = row.yearmonth.toString();
      let y = d.slice(0,4);
      let m = d.slice(4,7);
      let date = new Date(y,m);
      row.time = date.getTime();
    });
    if (!appliedFilters) return _data;

    Object.keys(appliedFilters).forEach(k => {
      if (k === "year" && appliedFilters[k].length > 0) {
        _data =  _data.filter(row => {
          return _inYear(row, appliedFilters[k]);
        })
      }
    });
    return _data;
  },

  getClimateMetric: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    let data = dashboardData.climateData;
    let output;

    if (isArray(data) && data.length > 0) {
      if (handler.field === 'TMIN') {
        output = data.map(r => { return r.tmin });
        return [min(output)]
      }

      if (handler.field === 'TMAX') {
        output = data.map(r => { return r.tmax });
        return [max(output)]
      }

      if (handler.field === 'TAVG') {
        output = data.map(r => { return parseInt(r.tavg) });
        return [mean(output).toPrecision(4)];
        let n = mean(output).toPrecision(4);
        return [n];
      }
    }

    return ["..."];
  },

  // @@TODO clean up NAN values
  getMapData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    let field = 'phdi';
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
         return ( r.value === row.statecode )
        });

        if (state) {
          row.name = state.label;
        }

        return row;
      });
    }
    console.log(mapped);


    return mapped;
  },

  getBarChartData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    const indicators = [ 'sp01', 'sp06', 'sp12', 'sp24' ];
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
          x: row['yearmonth'],
          y: row[ind]
        }
      }).filter(row => {
        return (!isNaN(row.y) && row.y > -10 && row.y < 10);
      });
      return {key: ind, values: data, color: colors[i]}
    });

    return series;
  },
}

for (let k in customDataHandlers) {
  DataHandler.set(k, customDataHandlers[k]);
}

/**
 * Helpers
 **/
let _inYear = function (row, years) {
  let y = row.yearmonth.toString().substring(0,4);
  return (years.indexOf(y) >= 0);
}

let _inState = function (row, states) {
  return (states.indexOf(row.statecode) >= 0);
}

export default customDataHandlers;
