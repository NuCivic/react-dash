let baseUrl = 'http://192.168.99.100:32770';
import {dateFormatter} from '../src/ReactDashboard';

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
      className: 'row',
      children: [
       {
        type: 'Region',
        className: 'zeroth-row col-md-6',
        children: [
           {
             type: 'img',
             src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTd9zBTlpPrH5EaWGrQISVCjA1E3AAzXCI_go0ml5QHI-58Cld73VBBRv8",
             style: {borderStyle:'double',borderWidth: '10px', borderColor:'teal', padding: '10px', margin: '10px'},
           },
        ]
       },
       {
        type: 'Region',
        className: 'zeroth-row col-md-6',
        children: [
           {
             type: 'h4',
             dangerouslySetInnerHTML: {__html: 'A text description set from the settings file, using native react html element.'},
             style: {margin: '20px'}
           },
        ]
       },
		  ]
		},
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
      children: [
        {
          type: 'Metric',
          cardStyle: 'metric',
          value: 'Value from Config',
          background: 'muave',
          iconClass: 'glyphicons glyphicons-link'
        },
        {
          type: 'Metric',
          cardStyle: 'metric',
          background: 'navy',
          iconClass: 'fa-clock-o',
          dataHandlers: [
            'getFTE'
          ],
        }
      ]
    },
    {
      header:'Gold Prices',
      type: 'Chart',
      iconClass: 'glyphicon glyphicon-tree-conifer',
      settings: {
          id:'lineChart2',
          type: 'lineChart',
          x: 'date',
          height: 340,
          margin: {
              left: 38
          },
          color: ['#EA7E7E'],
          xAxis: {
            tickFormat: dateFormatter('%Y')
          }
      },
      dataHandlers: [
          {
              name: 'common.parseDateField',
              field: 'date'
          },
          {
              name: 'common.fieldsToXYSeries',
              field: 'price',
              xField: 'date'
          },
          {
              name: 'NVD3.returnChartSeries',
              series: [
                  {name: 'Price', color:'#FF0000'},
              ]
          }
      ],
      cardStyle: 'card',
      fetchData: {
          type:'backend',
          backend: 'csv',
          url: 'http://demo.getdkan.com/sites/default/files/data_0.csv'
      },
      filters: [
        {
          type: 'ReactSelect',
          options: [
            {
              label: 'ALL',
              value: 'all'
            },
            {
              label: '1949 - 1976',
              value: '1949_1976'
            },
            {
              label: '1976 - 2012',
              value: '1976_2012'
            }
          ],
          dataHandlers: [
            'customDataHandler',
            {
              name: 'common.parseDateField',
              field: 'date'
            },
            {
              name: 'common.fieldsToXYSeries',
              field: 'price',
              xField: 'date'
            },
            {
              name: 'NVD3.returnChartSeries',
              series: [
                {name: 'Price', color:'#FF0000'},
              ]
            }
          ]
        },
      ],                    
    }, 
		/* {
     type: 'Region',
     header: 'Choropleth -- GEOJSON',
     children: [
        {
          type: 'Choropleth',
          cardStyle: 'none',
          format: 'geojson',
          fetchData: {
            url: '/data/apollo-parsed-1737-325_0.csv',
            type: 'backend',
            backend: 'csv',
          },
          id: 'Choropleth',
          dataKeyField: 'Zone',
          dataValueField: 'Total Observers',
          geometryKeyField: 'name',
          geometry: 'https://dl.dropboxusercontent.com/u/73703010/zones.geojson', // topojson or geojson
          projection: 'mercator', // https://github.com/d3/d3/wiki/Geo-Projections
          //projection: 'equirectangular', // https://github.com/d3/d3/wiki/Geo-Projections
          scaleDenominator: .7,
          borderColor: '#000000',
          noDataColor: '#F3F3F3',
          startColor: 'red',
          endColor: 'yellow',
          dataClassification: 'equidistant',
          legend: {
            classesCount: 5,
            legendHeader: 'abcdef',
            palleteKey: 'GnBu',
            pallete: ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'],
            domainStartValue: '',
            domainEndValue: '',
          }
        }, 
      ]
    }, */
		{
     type: 'Region',
     header: 'Unemployment by U.S. County',
     children: [
        {
          type: 'h4',
          dangerouslySetInnerHTML: {__html: 'Choropleth Heat Map -- topojson'}
        },
        {
          type: 'Choropleth',
          format: 'topojson',
          fetchData: {
            url: '/data/unemployment.tsv',
            type: 'backend',
            backend: 'csv',
            delimiter: '\t',
          },
          id: 'Choropleth-topo',
          dataKeyField: 'id',
          dataValueField: 'rate',
          geometryKeyField: 'id',
          geometry: '/data/us.json', // topojson or geojson
          //projection: 'mercator', // https://github.com/d3/d3/wiki/Geo-Projections
          projection: 'albersUsa', // https://github.com/d3/d3/wiki/Geo-Projections
          scaleDenominator: .8,
          borderColor: '#fff',
          noDataColor: 'red',
          topologyObject: 'counties',
          startColor: 'red',
          endColor: 'yellow',
          dataClassification: 'equidistant',
          legend: {
            classesCount: 5,
            palleteKey: 'GnBu',
            pallete: ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'],
            domainStartValue: '',
            domainEndValue: '',
          }
        },
        {
          type: 'Region',
          children: [
            {
              type: 'Goal',
              title: '',
              caption: 'number of schools enrollments',
              link: 'http://tootherplace.com',
              icon: 'glyphicon-leaf',
              startDate: '03/24/2016',
              endDate: '04/24/2016',
              startNumber: 0,
              endNumber: 200,
              showEndNumber: false,
              action: 'maintain_above',
              background: 'white',
              metric: 'getRandomMetric',
              dataHandlers: ['getMetricData'],
              captionTemplates: {
                  maintain_above: 'Teachers vs. Students',
              },
                  tolerance: [
                    {from: 0, to: 2, label: 'On Track', color: 'green'},
                    {from: 2, to: 5, label: 'Needs Improvement', color: 'orange'},
                    {from: 5, to: Infinity, label: 'Off Track', color: 'red'},
                  ],
                  spline: {
                    height: 50,
                  },
            },
            {
              type: 'Goal',
              title: '',
              caption: 'number of schools enrollments',
              link: 'http://tootherplace.com',
              icon: 'glyphicon-leaf',
              startDate: '03/24/2016',
              endDate: '04/24/2016',
              startNumber: 0,
              endNumber: 200,
              showEndNumber: false,
              action: 'maintain_above',
              background: 'white',
              metric: 'getRandomMetric',
              dataHandlers: ['getMetricData'],
              captionTemplates: {
                  maintain_above: 'Textbooks - Current vs. Projected',
              },
                  tolerance: [
                    {from: 0, to: 2, label: 'On Track', color: 'green'},
                    {from: 2, to: 5, label: 'Needs Improvement', color: 'orange'},
                    {from: 5, to: Infinity, label: 'Off Track', color: 'red'},
                  ],
                  spline: {
                    height: 50,
                  },
            },
          ]
        },
      ],
    },
		{
      type: 'Region',
      children: [
				{
          header: 'This is an awesome text',
					type: 'Text',
					content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat dui, sodales eleifend placerat a, dictum sed tortor.</p><p> Quisque porttitor urna in est vehicula, a molestie nunc pharetra. Cras vehicula nisi dui, ut aliquam nunc vulputate lacinia. Curabitur vitae interdum dolor, sed venenatis tellus. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat metus et ipsum lobortis, at porttitor nunc laoreet.</p><p>Nullam et ligula at enim pretium accumsan. In et facilisis enim, vel consectetur justo. Duis eleifend sit amet neque eu interdum. Sed ornare orci diam, ac finibus ipsum posuere vel. Duis maximus velit ipsum, et mattis massa tempus sit amet. Suspendisse potenti.</p>',
				},
				{
					type: 'DataTable',
					header: 'Mi titulo',
          data: [
    				['a1', 'b1', 'c1'],
						['a2', 'b2', 'c2'],
						['a3', 'b3', 'c3']
          ],
					cardStyle: 'table',
          // hideFilterHeader: true,  // <--- uncomment to hide filter control
          // hideControls: true,      // <--- uncomment to hide rows select control 
					settings: {
						table: {
							rowHeight: 40,
							width: 800,
							maxHeight: 300,
							headerHeight:40
						},
						columns: {
							flexGrow: 1,
							width: 150,
							overrides: {
								a1: {
									flexGrow: 0.5
								}
							}
						},
						cells: {
							height: 40,
							width: 500,
							overrides: {
								1: {
									height: 40
								}
							}
						}
					}
				},
      ]
		},
    {
      type: 'Region',
      children: [
        {
          type: 'Chart',
          header: 'Physician Distribution by Race',
          cardStyle: 'card',
          settings: {
            type: 'pieChart',
            x: 'race',
            y: 'race_count'
          },
          // Note that pieChart requires a single array - NOT an array of arrays as in other nvd3 charts
          data: [
            {race: 'African American', race_count: 100}, {race: 'White', race_count: 250}, {race: 'Asian', race_count: 100}, {race: 'Other', race_count:75}
          ],
        }
      ]
    }
  ]
};
