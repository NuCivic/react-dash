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
      className: 'dashboard-top-metrics',
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
          iconClass: 'fa fa-clock-o',
          dataHandlers: [
            'getFTE'
          ],
        }
      ]
    },
   /* {
      type: 'Chart',
      header: 'Physician Distribution by Age...',
      settings: {
        type: 'multiBarHorizontalChart',
        x: 'age',
        y: 'count_age',
        color: ['blue'],
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
    }, */ 
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
                  maintain_above: 'yo quiero mi template',
              },
                  tolerance: [
                    {from: 0, to: 2, label: 'On Track', color: 'green'},
                    {from: 2, to: 5, label: 'Needs Improvement', color: 'orange'},
                    {from: 5, to: Infinity, label: 'Off Track', color: 'red'},
                  ],
                  spline: {
                    height: 50,
                  },
            }
          ]
        }
      ]
    }
  ]
};
