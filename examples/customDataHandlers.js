import DataHandler from '../src/utils/DataHandler';

let passThroughHandler = function (a,b,c,d,e,f) {
  console.log('pass',a,b,c,d,e,f);
  return [1,2,3,4,5];
}

DataHandler.set('passThroughHandler', passThroughHandler);

let customDataHandler = function (componentData, dashboardData, handler, e, pipelineData) {
  console.log('c', this, componentData, dashboardData, handler, e, pipelineData);
  let dates = e.value.split('_') || 'ALL';
  let data = this.fetchData();
  console.log('ddd', data);
  
  if (dates === 'ALL') return 
  console.log('dates', dates);
  function randomDate(start, end) {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	}

  let d1 = randomDate(new Date(2012, 0, 1), new Date());
  let d2 = randomDate(new Date(2012, 0, 1), new Date());
  let d3 = randomDate(new Date(2012, 0, 1), new Date());
  let r = [[{date:d1,price:2}, {date:d2,price:3}, {date:d3,price:4}]];
  return r;
}

DataHandler.set('customDataHandler', customDataHandler);

let customDataHandlers = {
	customDataHandler: customDataHandler
}

export default customDataHandlers;
