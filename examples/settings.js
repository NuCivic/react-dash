export var settings = {
  title: 'React-Dash v0.5.x -- Climate Indices by Year',
  queries: {},
  doFilterRouting: false,
  dataResources: {
    climateData: {
      fetchData: {
        type: 'backend',
        backend: 'csv',
        url: 'https://dl.dropboxusercontent.com/u/73703010/react_dash_data_0.4/climate_indices.csv'
      },
    }
  },

  regions: [
    {
      id: 'metrics-row',
      className: 'row',
      children: [
        {
          type: 'Metric',
          cardStyle: 'metric',
          iconClass: 'fa fa-level-up',
          className: 'col-md-4',
          background: "#00b3b3",
          caption: 'Maximum Temp.',
          data: [1],
        }
      ]
    }
  ]
}


let climateVars = {
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
		};
