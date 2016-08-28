const baseUrl = 'http://192.168.99.100:32770';
export var settings = {
  title: 'State Medical Board Licensure Data',
  queries: {
    by_age: {
      group_by: "age",
      count: "age",
      //fields: "age"
    },
  },
  components: [
    {
      type: 'Region',
      className: 'dashboard-top-filter',
      header: 'Foobar',
      children: [
        {
          type: 'Autocomplete',
          name: 'county-autocomplete',
          multi: true,
          url: baseUrl+'/dashboard_autocomplete/GBPW_Counties',
          cardStyle: 'none',
          id: 'county-autocomplete',
          placeholder: 'Select county'
        },
      ]
    },
    {
      type: 'Region',
      className: 'dashboard-top-metrics',
      children: [
        {
          type: 'Metric',
          cardStyle: 'metric',
          value: 'Val form Config',
          background: 'muave',
          iconClass: 'glyphicons glyphicons-link'
        },
        {
          type: 'Metric',
          cardStyle: 'metric',
          background: 'navy',
          iconClass: 'fa fa-clock-o',
          dataHandlers: [
            'getFTE'
          ],
        }
      ]
    },
    {
      type: 'Chart',
      header: 'Physician Distribution by Age...',
      settings: {
        type: 'multiBarHorizontalChart',
        x: 'age',
        y: 'count_age',
        color: ['blue'],// '#ffe6e6', '#ffcccc', '#ffb3b3', '#ff9999', '#ff8080', '#ff6666', '#ff4d4d', '#ff3333', '#ff1a1a']
      },
      dataHandlers: [
        {
          name: 'getXYByQueryData',
          queryKey: 'by_age',
          xField: 'age',
          yField: 'count'
        },
        {
          name: 'groupByRange',
          ranges: [ [0,34], [35,39], [40,44], [45,49], [50,54], [55,59], [60,64], [65,125] ],
          xField: 'age',
          yField: 'count_age'
        },
        {
          name: 'NVD3.returnChartSeries',
          series: [
            {name: 'Age', color:'#FF0000'},
          ]
        }        
      ]
    }
  ]
  
  
  /* {
    filterCounty: [
      {
        type: 'Autocomplete',
        name: 'county-autocomplete',
        multi: true,
        url: '/dashboard_autocomplete/GBPW_counties',
        cardStyle: 'none',
        id: 'county-autocomplete',
        placeholder: 'Select county'
      }
    ],
    filterSpecialty: [
      {
        type: 'Autocomplete',
        name: 'specialty-autocomplete',
        multi: true,
        url: '/dashboard_autocomplete/GBPW_Specialty',
        cardStyle: 'none',
        id: 'year-autocomplete',
        placeholder: 'Select specialty'
      }
    ],
    top: [
      {
        id: 'by_age',
        header:'Doctors by Age',
        type: 'GAChart',
        iconClass: 'fa fa-bar-chart',
        settings: {
          id:'by_age',
          type: 'discreteBarChart',
          x: 'age',
          y: 'count_sum',
          height: 360,
          rotateLabels: -45,
          xAxis: {
            tickFormat: (d) => d.replace(' County', '')
          },
          margin: {
            bottom: 70
          },
          noData: 'Loading...'
        },
        cardStyle: 'card',
        dataHandlers: []
      },
    ] 
  } */
};
