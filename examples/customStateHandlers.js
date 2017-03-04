import { StateHandler } from '../src/ReactDashboard'

let customStateHandlers = {
  /**
   * get the background color for the Maximum Temp. Metric based on value
   */
  getMaxTempMetricColor: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    console.log('gMTMC', this, arguments);
    if (componentData[0] && componentData[0] >= 100) {
      return 'red';
    } else {
      return 'blue';
    }
  }
}

for (let k in customStateHandlers) {
  StateHandler.set(k, customStateHandlers[k]);
}

export default customStateHandlers;
