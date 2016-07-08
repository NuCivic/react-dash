import DataHandler from '../src/utils/DataHandler';

let passThroughHandler = function (componentData, dashboardData, handler, e, pipelineData) {
  let _data = pipelineData || componentData;
  return _data;;
}

DataHandler.set('passThroughHandler', passThroughHandler);

let customDataHandler = function (componentData, dashboardData, handler, e, pipelineData) {
  let _data = pipelineData || componentData;
  let dates = e.value.split('_') || 'ALL';
  if (dates[0] === 'all') {
    return _data;
  } else {
    let low = Date.parse(dates[0]);
    let high = Date.parse(dates[1]);
    let vals = _data;
    let filteredVals = vals.filter(d => { console.log(d); return (Date.parse(d.date) >= low && Date.parse(d.date) <= high) });
    return filteredVals;   
  }
}

DataHandler.set('customDataHandler', customDataHandler);

let customDataHandlers = {
	customDataHandler: customDataHandler
}

export default customDataHandlers;
