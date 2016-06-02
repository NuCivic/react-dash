
import colorbrewer from 'colorbrewer';
import {timeFormat as d3_timeFormat} from 'd3-time-format';


export var settings = {
  title: 'Georgia Reports',
  regions: {
    top: [
     {
        type: 'Autocomplete',
        name: 'some-name',
        multi: true,
        options: [{ value: 'one', label: 'One' },{ value: 'two', label: 'Two' }]
      },
      {
        header:'Top',
        type: 'GAChart',
        iconClass: 'glyphicon glyphicon-tree-conifer',
        settings: {
          id:'lineChart2',
          type: 'lineChart',
          x: 'date',
          y: 'price',
          height: 340,
          margin: {
            left: 38
          },
          color: ['#EA7E7E'],
          xAxis: {
            tickFormat: d3_timeFormat('%Y')
          }
        },
        cardStyle: 'card',
        fetchData: {type:'function', name: 'getTopChartData'},

      },
      /* Docs:
       * Domain Data should be formatted:
       * [
       *  {
       *    mapKey: 'PKValue',
       *    domainField: 'Value',
       *    ignoredVal: 'foo',
       *    moreExtraneousData: {...}
       *  },
       *  ...
       * ]
       *
       * mapKey should be the key for the value representi9ng the map polygon
       */
      {
        header: 'GAChoropleth Test',
        type: 'GAChoropleth',
        settings: {
          colors:colorbrewer.OrRd[9],
          cssPath: '/static/choropleth.css',
          showTooltip: {true},
          levels: 9, // number of Choropleth levels
          domainLower: 0, // specify domain range - this can also be overridden in the domainScale functionion()
          domainUpper: .15, // ibid.
          domainKey: 'id', // unique key from data row that corresponds to domainKey
          mapKey: 'id', // key from map data that corresponds to domainKey
          filters: [
            {
              field: 'rate',
              title: 'Unemployent Rate',
              legendHeader: 'Unemployment Rate by US County',
              legendValFormat: '%', // format string for d3.format function
              legendValPrecision: 3, // Defaults to 2
            },
            {
              field: 'foo',
              title: 'Arbitrary (Field for testing)',
              legendHeader: 'Just an arbitrary field for testing',
              legendValFormat: 'n', // format string for d3.format function
            }
          ],
          tooltip: {
            attr: 'rate',
            label: 'Unemployment rate'
          },
          mapFormat: 'topojson',
          mapDataUrl: '/data/us.json',
          polygon: 'counties',
          mesh: 'states',
          projection: 'albersUsa',
          showGraticule: true,
					legendHeight : 400,
					legendMargins : {top: 40, right: 50, bottom: 40, left: 50},
					legendClassName : "test-legend-class",
					legendPosition : 'left',
					legendOffset : 90
        },
        fetchData: {
           type: 'backend',
           backend: 'csv',
           url: '/data/unemployment.csv',
        },
        queryObj: {size: 10000000, from:0}, // we want them all
        cardStyle: 'card',
      },
      // @@TODO add better geojson example
/*      {
        header: 'GAChoropleth Test ][ - GEOJSON',
        type: 'GAChoropleth',
        settings: {
          colors: ['red','green','yellow','purple','orange','pink','#252525','#000000'],
          cssPath: '/static/choropleth.css',
          showTooltip: {true},
          filters: [
            {
              legendHeader: 'Accred. Time: Before 8 AM #',
              field: 'Accred. Time: Before 8 AM #',
              title: "Accredation Time (Before 8 AM)",
            },
          ],
          levels: 30,
          domainKey: 'Zone', // map key in domain data
          mapKey: 'name', // map key in map data
          tooltip: {
            label: 'Accred',
            attr: 'Accred. Time: Before 8 AM #'
          },
          mapDataUrl: '/data/zones.geojson',
          mapFormat: 'geojson',
          showGraticule: false,
					legendHeight : 400,
					legendMargins : {top: 40, right: 50, bottom: 40, left: 50},
					legendClassName : "test-legend-class",
					legendPosition : 'left',
					legendOffset : 90
        },
        fetchData: {
          type: 'backend',
          backend: 'csv',
          url: '/data/apollo-parsed-1737-325_0.csv',
        },
        queryObj: {size: 10000000, from: 0},
        cardStyle: 'card'
      } */
    ],
    middleFirst: [
      {
        type:'GAMetric',
        cardStyle: 'metric',
        background: '#9F3E69',
        metric: 'getRandomMetric',
        caption: 'New Users',
        iconClass: 'glyphicon glyphicon-user'
      }
    ],
    middleSecond: [
      {
        type:'GAMetric',
        cardStyle: 'metric',
        background: '#F3BA4F',
        metric: 'getRandomMetric',
        caption: 'Visitors',
        iconClass: 'glyphicon glyphicon-heart'
      }
    ],
    middleThird: [
      {
        type:'GAMetric',
        cardStyle: 'metric',
        background: '#3EB1AE',
        metric: 'getRandomMetric',
        caption: 'Page views',
        iconClass: 'glyphicon glyphicon-star'
      }
    ],
    middleFourth: [
      {
        type:'GAMetric',
        cardStyle: 'metric',
        background: '#0B90B1',
        metric: 'getAVGPrice',
        caption: 'Unique Visitors',
        iconClass: 'glyphicon glyphicon-road',
        fetchData: {type: 'function', name: 'getCustomData'}
      }
    ],
    goalsFirst: [
      {
        type: 'GAGoal',
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
        captionTemplates: {
          maintain_above: 'yo quiero mi template',
        },
        // trackStatus: 'function',
        tolerance: [
          {from: 0, to: 2, label: 'On Track', color: 'green'},
          {from: 2, to: 5, label: 'Needs Improvement', color: 'orange'},
          {from: 5, to: Infinity, label: 'Off Track', color: 'red'},
        ],
        spline: {
          height: 50,
        },
        fetchData: {type:'function', name: 'getCustomData'},
        metric: 'getRandomMetric'
      }
    ],
    goalsSecond: [
      {
        type: 'GAGoal',
        title: '',
        caption: 'number of schools enrollments',
        link: 'http://tootherplace.com',
        icon: 'glyphicon-shopping-cart',
        startDate: '03/24/2016',
        endDate: '04/24/2016',
        startNumber: 0,
        endNumber: 200,
        action: 'increase',
        background: 'white',
        // trackStatus: 'function',
        tolerance: [
          {from: 0, to: 2, label: 'On Track', color: 'green'},
          {from: 2, to: 5, label: 'Needs Improvement', color: 'orange'},
          {from: 5, to: Infinity, label: 'Off Track', color: 'red'},
        ],
        spline: {
          height: 50,
        },
        fetchData: {type:'function', name: 'getCustomData'},
        metric: 'getRandomMetric'
      }
    ],
    goalsThird: [
      {
        type: 'GAGoal',
        title: '',
        caption: 'number of schools enrollments',
        link: 'http://tootherplace.com',
        icon: 'glyphicon-gbp',
        startDate: '03/24/2016',
        endDate: '04/24/2016',
        startNumber: 0,
        endNumber: 200,
        action: 'increase',
        background: 'white',
        // trackStatus: 'function',
        tolerance: [
          {from: 0, to: 2, label: 'On Track', color: 'green'},
          {from: 2, to: 5, label: 'Needs Improvement', color: 'orange'},
          {from: 5, to: Infinity, label: 'Off Track', color: 'red'},
        ],
        spline: {
          height: 50,
        },
        fetchData: {type:'function', name: 'getCustomData'},
        metric: 'getRandomMetric'
      }
    ],
    left: [
      {
        header:'Left',
        iconClass: 'glyphicon glyphicon-fire',
        type: 'GAChart',
        settings: {
          id:'lineChart',
          type: 'discreteBarChart',
          x: 'label',
          y: 'value',
          height: 300,
          margin: {
            left: 38
          },
        },
        cardStyle: 'card',
        fetchData: {type:'function', name: 'getCustomData'},
      },
      {
        type: 'GATable',
        header: 'Mi titulo',
        fetchData: {
          type:'backend',
          backend: 'csv',
          url: 'http://demo.getdkan.com/node/9/download',
        },
        cardStyle: 'table',
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
    ],
    right: [
      {
        header:'Right',
        type: 'GAChart',
        iconClass: 'glyphicon glyphicon-exclamation-sign',
        settings: {
          id:'barChart',
          type: 'discreteBarChart',
          x: 'label',
          y: 'value',
          height: 300,
          margin: {
            left: 38
          },
          color: ['#82899B']
        },
        cardStyle: 'card',
        fetchData: {type:'function', name: 'getCustomData'},
      },
      {
        header: 'This is an awesome text',
        type: 'Text',
        content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat dui, sodales eleifend placerat a, dictum sed tortor.</p><p> Quisque porttitor urna in est vehicula, a molestie nunc pharetra. Cras vehicula nisi dui, ut aliquam nunc vulputate lacinia. Curabitur vitae interdum dolor, sed venenatis tellus. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat metus et ipsum lobortis, at porttitor nunc laoreet.</p><p>Nullam et ligula at enim pretium accumsan. In et facilisis enim, vel consectetur justo. Duis eleifend sit amet neque eu interdum. Sed ornare orci diam, ac finibus ipsum posuere vel. Duis maximus velit ipsum, et mattis massa tempus sit amet. Suspendisse potenti.</p>',
        cardStyle: 'card',
      }
    ],
  }
};
