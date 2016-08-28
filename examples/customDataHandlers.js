import DataHandler from '../src/utils/DataHandler'

let customDataHandlers = {
	customDataHandler: function (componentData, dashboardData, handler, e, pipelineData) {
    let dates = 'ALL'
		let _data = pipelineData || componentData;
    
    if (e && e.value) {
      dates = e.value.split('_') || 'ALL';
    } 
    console.log(_data, dates); 
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

    console.log('FF', finalOutput); 
    return finalOutput;
  },

  getFTE: function (componentData, dashboardData, handler, e, pipelineData) {
    console.log('getFTE', arguments);
    return [['FTE Value']];
  }
}

for (let k in customDataHandlers) {
  DataHandler.set(k, customDataHandlers[k]);
}

export default customDataHandlers;
