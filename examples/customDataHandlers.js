import DataHandler from '../src/utils/DataHandler'
import last from 'lodash/last';

let customDataHandlers = {
	customDataHandler: function (componentData, dashboardData, handler, e, pipelineData) {
    let dates = 'ALL'
		let _data = pipelineData || componentData;
    
    if (e && e.value) {
      dates = e.value.split('_') || 'ALL';
    } 
		if (dates[0] === 'all') {
			return _data;
		} else {
			let low = Date.parse(dates[0]);
			let high = Date.parse(dates[1]);
			let vals = _data;
			let filteredVals = vals.filter(d => { return (Date.parse(d.date) >= low && Date.parse(d.date) <= high) });
			return filteredVals;   
		}
	},

  getXYByQueryData: function (componentData, dashboardData, handler, e, pipelineData) {
    if (componentData && componentData.length > 0) {
      let localData = componentData[handler.queryKey].result.records;
      let output =  localData.map(row => {
        return {age: row.age, count_age: row.count_age }
      });
      return [output];
    } 
  },

  groupByRange: function (componentData, dashboardData, handler, e, pipelineData) {
    let data = pipelineData || componentData;
    let finalOutput = []; // array of series
    data.forEach(series => {
      let outputSeries = []; // an array of objects
      for (let i in handler.ranges) {
        let lowerBound = handler.ranges[i][0];
        let upperBound = handler.ranges[i][1];
        let xVal = lowerBound + ' - ' + upperBound;
        let yVal = 0;
        let groupedRow = {};
        // loop through vals for current range, if it's in the range, add to the running yVal sum;
        series.forEach(row => {
          // if it's in the range, add it to this range's sum
          if (row[handler.xField] >= lowerBound && row[handler.xField] <= upperBound) {
            yVal += parseInt(row[handler.yField]);
          }
        })
        
        groupedRow[handler.xField] = xVal;
        groupedRow[handler.yField] = yVal;
        outputSeries.push(groupedRow);
      }
      // now add our transformed series to the array of series for output
      finalOutput.push(outputSeries);
    });

    return finalOutput;
  },

  getFTE: function (componentData, dashboardData, handler, e, pipelineData) {
    return [['FTE Value']];
  },

  /**
   * Metric 
   */
  // metricHandler - not that this is not a dataHandler per se, it cannot be used in a data
  // pipeline - we're just storing the function in the DataHandler's registry
  // It is used internally by the goal component
  getRandomMetric: function (data) {
    if (data && last(data)) {
      return Number(last(data).y).toFixed(2);
    }
  },

  // data handler
  getMetricData: function (componentData, dashboardData, handler, e, pipelineData) {
  	function randomData(startPrice, volatility, numPoints) {
      var rval =  [];
      var now =+new Date();
      numPoints = numPoints || 100;
      for(var i = 1; i < numPoints; i++) {
          rval.push({x: now + i * 1000 * 60 * 60 * 24, y: startPrice});
          var rnd = Math.random();
          var changePct = 2 * volatility * rnd;
          if ( changePct > volatility) {
              changePct -= (2*volatility);
          }
          startPrice = startPrice + startPrice * changePct;
      }
      return rval;
    }
    
    let mData = randomData(50.0, 0.02);
    return mData;
  }
}

for (let k in customDataHandlers) {
  DataHandler.set(k, customDataHandlers[k]);
}

export default customDataHandlers;
