export var settings = {
  title: 'React-Dash Demo -- Climate Indices',
  queries: {},
	// we will add this to globalData in app.js 
  // and use these labels in our customDatahandlers
  climate_vars: {
    PCP: 'Precipitation Index',
    TAVG: 'Temperature Index',
    TMIN: 'Minimum Temperature Index',
    TMAX: 'Maximum Temperature Index',
    PDSI: 'Palmer Drought Severity Index',
    PHDI: 'Palmer Hydrological Drought Index',
    ZNDX: 'Palmer Z-Index',
    PMDI: 'Modified Palmer Drought Severity Index',
    CDD: 'Cooling Degree Days',
    HDD: 'Heating Degree Days',
    SPnn: 'Standard Precipitation Index'
	},
  
  // if defined at the top level, fetchData will populate
  // the dashboard with globalData
  fetchData: {
    type: 'backend',
    backend: 'csv',
    url: 'data/climate_indices.csv'
  },

  components: [
    
    // region top
    {
      type: 'Region',
      className: 'region region-top row',
      children: [
        {
          type: 'h3',
          dangerouslySetInnerHTML: {__html: 'Climate Indices for U.S. States 2010 -- 2015'}
        },
        // state filter
        // year filter
        // metric - driest month
        // metric - wettest month
        // metric - hottest month
        // metric - coolest month
      ]
    },

    // region choropleth
    /*{
      type: 'region',
      className: 'region-choropleth'
      children: [
        // choropleth
      ]
    },

    // region pie-charts
    {
      type: 'region',
      className: 'region-pies',
      children: [

        // pies 1
        {
          type: 'region',
          className: 'pies-1',
          children: [
            // pieChart
            // table
          ]
        },

        // pies 2
        {
          type: 'region',
          className: 'pies-2',
          children: [
            // pieChart
            // table
          ]
        }    
      ]
    },*/

    // region lower
    {
      type: 'Region',
      className: 'region region-lower row',
      children: [          
        {
          type: 'p',
          dangerouslySetInnerHTML: {__html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'}
        }
        // line chart
        // bar chart
      ]
    },

    // region footer
    {
      type: 'Region',
      className: 'region region-footer row',
      children: [
        {
          type: 'p',
          dangerouslySetInnerHTML: {__html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'}
        }     
      ]
    }
  ]
}
