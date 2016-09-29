const stateIds = 
						[
							{ value: 1, label: 'AK' },
							{ value: 30, label: 'NY' },
							{ value: 2, label: 'AZ' },
							{ value: 31, label: 'NC' },
							{ value: 3, label: 'AR' },
							{ value: 32, label: 'ND' },
							{ value: 4, label: 'CA' },
							{ value: 33, label: 'OH' },
							{ value: 5, label: 'CO' },
							{ value: 34, label: 'OK' },
							{ value: 6, label: 'CT' },
							{ value: 35, label: 'OR' },
							{ value: 7, label: 'DE' },
							{ value: 36, label: 'PA' },
							{ value: 8, label: 'FL' },
							{ value: 7, label: 'RI' },
							{ value: 9, label: 'GA' },
							{ value: 38, label: 'SC' },
							{ value: 10, label: 'ID' },
							{ value: 39, label: 'SD' },
							{ value: 11, label: 'IL' },
							{ value: 40, label: 'TN' },
							{ value: 12, label: 'IA' },
							{ value: 41, label: 'TX' },
							{ value: 13, label: 'IA' },
							{ value: 42, label: 'UT' },
							{ value: 14, label: 'KS' },
							{ value: 43, label: 'VT' },
							{ value: 15, label: 'KT' },
							{ value: 44, label: 'VA' },
							{ value: 16, label: 'LA' },
							{ value: 45, label: 'WA' },
							{ value: 17, label: 'ME' },
							{ value: 46, label: 'WV' },
							{ value: 18, label: 'MD' },
							{ value: 47, label: 'WI' },
							{ value: 19, label: 'MA' },
							{ value: 48, label: 'WY' },
							{ value: 20, label: 'MI' },
							{ value: 21, label: 'MN' },
							{ value: 22, label: 'MI' },
							{ value: 103, label: 'Central Region' },
							{ value: 23, label: 'MO' },
							{ value: 24, label: 'MT' },
							{ value: 25, label: 'NE' },
							{ value: 106, label: 'South Region' },
							{ value: 26, label: 'NV' },
							{ value: 27, label: 'NH' },
							{ value: 28, label: 'NJ' },
							{ value: 29, label: 'NM' },
						]
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
    url: 'examples/data/climate_indices.csv'
  },
  // if applied at the top level, datahandlers will filter global data
  dataHandlers: ['filterData'],

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
        {
          type: 'Autocomplete',
          cid: 'a1',
          field: 'year',
          placeholder: 'Select year...',
          dataHandlers: [{name: 'getEventReturn'}],
          multi: true,
          fetch: true,
          options: [
            { label: '2010', value: '2010' },
            { label: '2011', value: '2011' },
            { label: '2012', value: '2012' },
            { label: '2013', value: '2013' },
            { label: '2014', value: '2014' },
            { label: '2015', value: '2015' },
          ]
        },
        {
          type: 'Autocomplete',
          cid: 'a2',
          field: 'state',
          id: 'autocomplete-state',
          placeholder: 'Select state...',
          dataHandlers: [{name: 'getEventReturn'}],
          multi: true,
          fetch: true,
          options: stateIds,
        },
      ]
    },
    {
      type: 'Region',
      className: 'region-metrics region row',
      children: [
        {
          type: 'Metric',
          cardStyle: 'metric',
          iconClass: 'fa fa-level-up',
          className: 'col-md-4',
          caption: 'Max avg temp',
          dataHandlers: ['getNumRecords']
        },
        {
          type: 'Metric',
          cardStyle: 'metric',
          iconClass: 'fa fa-level-down',
          className: 'col-md-4',
          background: '#53ACC9',
          caption: 'Min avg temp',
          value: '999 deg'
        },
        {
          type: 'Metric',
         
          iconClass: 'fa fa-fire',
          className: 'col-md-4',
          caption: 'Max avg temp',
          background: '#C97053',
          value: '999 deg'
        }
      ]
    },

    // region choropleth
    {
      type: 'Region',
      className: 'region-choropleth',
      children: [
        // choropleth
        {
          type: 'Choropleth',
          cid: 'choro1',
          format: 'topojson',
          dataHandlers: [
            {
              name: 'getMapData',
              stateArray: stateIds
            }
          ],
          dataKeyField: 'name',
          dataValueField: 'PHDI',
          geometryKeyField: 'name',
          geometry: 'examples/data/map/usa.json', // topojson or geojson
          projection: 'albersUsa', // https://github.com/d3/d3/wiki/Geo-Projections
          scaleDenominator: .8,
          borderColor: '#ffcccc',
          noDataColor: 'red',
          topologyObject: 'usa',
          startColor: 'red',
          endColor: 'yellow',
          dataClassification: 'equidistant',
          legend: {
            classesCount: 5,
            palleteKey: 'GnBu',
            pallete: ['#ffcccc', '#ffb3b3', '#ff9999', '#ff8080', '#ff6666', '#ff4d4d', '#ff3333'],
            domainStartValue: '',
            domainEndValue: '',
          }
        },
      ]
    },

    // region pie-charts
    /*{
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
