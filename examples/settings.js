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
        {
          type: 'Autocomplete',
          cid: 'a1',
          asFilter: true,
          id: 'autocomplete-year',
          placeholder: 'Select year...',
          dataHandlers: [{name: 'getEventReturn'}],
          multi: true,
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
          asFilter: true,
          id: 'autocomplete-state',
          placeholder: 'Select state...',
          dataHandlers: [{name: 'getEventReturn'}],
          multi: true,
          options: 
						[
							{ value: '001', label: 'Alabama' },
							{ value: '030', label: 'New York' },
							{ value: '002', label: 'Arizona' },
							{ value: '031', label: 'North Carolina' },
							{ value: '003', label: 'Arkansas' },
							{ value: '032', label: 'North Dakota' },
							{ value: '004', label: 'California' },
							{ value: '033', label: 'Ohio' },
							{ value: '005', label: 'Colorado' },
							{ value: '034', label: 'Oklahoma' },
							{ value: '006', label: 'Connecticut' },
							{ value: '035', label: 'Oregon' },
							{ value: '007', label: 'Delaware' },
							{ value: '036', label: 'Pennsylvania' },
							{ value: '008', label: 'Florida' },
							{ value: '037', label: 'Rhode Island' },
							{ value: '009', label: 'Georgia' },
							{ value: '038', label: 'South Carolina' },
							{ value: '010', label: 'Idaho' },
							{ value: '039', label: 'South Dakota' },
							{ value: '011', label: 'Illinois' },
							{ value: '040', label: 'Tennessee' },
							{ value: '012', label: 'Indiana' },
							{ value: '041', label: 'Texas' },
							{ value: '013', label: 'Iowa' },
							{ value: '042', label: 'Utah' },
							{ value: '014', label: 'Kansas' },
							{ value: '043', label: 'Vermont' },
							{ value: '015', label: 'Kentucky' },
							{ value: '044', label: 'Virginia' },
							{ value: '016', label: 'Louisiana' },
							{ value: '045', label: 'Washington' },
							{ value: '017', label: 'Maine' },
							{ value: '046', label: 'West Virginia' },
							{ value: '018', label: 'Maryland' },
							{ value: '047', label: 'Wisconsin' },
							{ value: '019', label: 'Massachusetts' },
							{ value: '048', label: 'Wyoming' },
							{ value: '020', label: 'Michigan' },
							{ value: '021', label: 'Minnesota' },
							{ value: '022', label: 'Mississippi' },
							{ value: '103', label: 'Central Region' },
							{ value: '023', label: 'Missouri' },
							{ value: '024', label: 'Montana' },
							{ value: '025', label: 'Nebraska' },
							{ value: '106', label: 'South Region' },
							{ value: '026', label: 'Nevada' },
							{ value: '027', label: 'New Hampshire' },
							{ value: '028', label: 'New Jersey' },
							{ value: '029', label: 'New Mexico' },
						]
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
