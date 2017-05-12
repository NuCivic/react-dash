import { StateHandler } from '../src/ReactDashboard';
import React, { Component } from 'react';


let customStateHandlers = {
  /**
   * get the background color for the Maximum Temp. Metric based on value
   */
  getMaxTempMetricColor: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    if (componentData[0] && componentData[0] >= 100) {
      return '#f4e542';
    } else {
      return '#41c1f4';
    }
  },

  isStatSignificant: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
     return (
        <p style={{backgroundColor: "#f4e542", padding: "1em", marginTop: "1em", width: "100%"}}>
          [This is an example of a programatically generated footer]
        </p>
      )
  }
}

for (let k in customStateHandlers) {
  StateHandler.set(k, customStateHandlers[k]);
}

export default customStateHandlers;
