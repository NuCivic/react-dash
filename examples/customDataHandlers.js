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
    return _data;
  } else {
    let low = Date.parse(dates[0]);
    let high = Date.parse(dates[1]);
    let vals = _data;
    console.log(low,high,vals)
    let filteredVals = vals.filter(d => { console.log(d); return (Date.parse(d.date) >= low && Date.parse(d.date) <= high) });
    console.log('ff', filteredVals);
    return filteredVals;   
  }
}

DataHandler.set('customDataHandler', customDataHandler);

let customDataHandlers = {
	customDataHandler: customDataHandler
}

export default customDataHandlers;
