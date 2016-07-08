import DataHandler from '../src/utils/DataHandler';

let passThroughHandler = function (componentData, dashboardData, handler, e, pipelineData) {
  let _data = pipelineData || componentData;
  console.log('passThroughHandler', _data, componentData, dashboardData, handler, e , pipelineData);
  return _data;;
}

DataHandler.set('passThroughHandler', passThroughHandler);

let customDataHandler = function (componentData, dashboardData, handler, e, pipelineData) {
  let _data = pipelineData || componentData;
  console.log('c', this, _data, componentData, dashboardData, handler, e, pipelineData);
  let dates = e.value.split('_') || 'ALL';
  if (dates[0] === 'all') {
    // just reload the component
    console.log('123');
    return this.fetchData();
  } else {
    let low = Date.parse(dates[0]);
    let high = Date.parse(dates[1]);
    let vals = _data[0].values;
    console.log(low,high,vals)
    let filteredVals = vals.filter(d => { return (d.x >= low && d.x <= high) }).map(d => {
        let date = new Date(d.x);
        let r = {date: date, price: d.y};
        return r;
    });
    console.log(filteredVals);
    return filteredVals;   
  }
}

DataHandler.set('customDataHandler', customDataHandler);

let customDataHandlers = {
	customDataHandler: customDataHandler
}

export default customDataHandlers;
