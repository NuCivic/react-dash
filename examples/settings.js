export var settings = {
  title: 'Georgia Reports',
  regions: {
    top: [
/*     {
        type: 'Autocomplete',
        name: 'some-name',
        multi: true,
        url: 'http://localhost:3004/options?q={{keyword}}',
        onChange: 'onAutocompleteChange',
        cardStyle: 'none'
      },
      {
        header:'Top',
        type: 'GAChart',
        iconClass: 'glyphicon glyphicon-tree-conifer',
        settings: {
          id:'lineChart2',
          type: 'discreteBarChart',
          x: 'label',
          y: 'value',
          height: 340,
          margin: {
            left: 38
          },
          color: ['#EA7E7E']
        },
        cardStyle: 'card',
        fetchData: {type:'function', name: 'getData'},
      },
      {
        header: 'GAChoropleth Test',
        type: 'Choropleth',
        settings: {
          colors:['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'pink','violet', 'darkmagenta'],
          cssPath: '/static/choropleth.css',
          showTooltip: {true},
          domainField: 'rate',
          levels: 9,
          domainLower: 0,
          domainUpper: .15,
          legendHeader: "Per Cent Unemploytment by U.S. County",
          width: 1200,
          height: 600,
          domainKey: 'id',
          dataset: {
            backend: 'csv',
            url: '/data/unemployment.tsv',
            delimiter: '\t'
          },
          mapFormat: 'topojson',
          mapDataUrl: '/data/us.json',
          polygon: 'counties',
          mesh: 'states',
          projection: 'albersUsa',
          showGraticule: true,
        },
        cardStyle: 'card',
        fetchData: {type:'function', name: 'getData'},
      }, */ 
      {
        header: 'GAChoropleth Test',
        type: 'Choropleth',
        settings: {
          colors:['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'pink','violet', 'darkmagenta'],
          cssPath: '/static/choropleth.css',
          showTooltip: {true},
          domainField: 'rate',
          levels: 9,
          domainLower: 0,
          domainUpper: .15,
          legendHeader: "Per Cent Unemploytment by U.S. County",
          legendValPrecision: 3, // Defaults to 2
          width: 1200,
          height: 600,
          domainKey: 'id',
          domainKeyName: 'id',
          dataset: {
            backend: 'csv',
            url: '/data/unemployment.tsv',
            delimiter: '\t'
          },
          mapFormat: 'topojson',
          mapDataUrl: '/data/us.json',
          polygon: 'counties',
          mesh: 'states',
          projection: 'albersUsa',
          showGraticule: true,
        },
        cardStyle: 'card',
        fetchData: {type:'function', name: 'getData'},
      }, 
      {
        header: 'GAChoropleth Test ][ - GEOJSON',
        type: 'GeojsonChoropleth',
        settings: {
          colors: ['#ffffff','#f0f0f0','#d9d9d9','#bdbdbd','#969696','#737373','#525252','#252525','#000000'],
          cssPath: '/static/choropleth.css',
          showTooltip: {true},
          legendHeader: 'Accred. Time: Before 8 AM #',
          domainKey: 'Zone',
          domainKeyName: 'name',
          levels: 10,
          domainLower: 64, //      @@TODO - it might make sense in some circumstance to use fixed bounds 
          domainUpper: 328, //    @@       but we probably just want to programatically get the ranges
          domainField: 'Accred. Time: Before 8 AM #',
          dataset: {
            backend: 'csv',
            url: '/data/apollo-parsed-1737-325_0.csv',
            delimiter: ','
          },
          mapDataUrl: '/data/zones.geojson',
          mapFormat: 'geojson',
          showGraticule: false,
          projection: 'conicConformal' // https://github.com/mbostock/d3/wiki/Geo-Projections
        },
        cardStyle: 'card',
        fetchData: 'getData'
      }
    ],
    middleFirst: [
      {
        type:'GAMetric',
        cardStyle: 'metric',
        background: '#9F3E69',
        metric: 'getRandomMetric',
        caption: 'New Users',
      }
    ],
    middleSecond: [
      {
        type:'GAMetric',
        cardStyle: 'metric',
        background: '#F3BA4F',
        metric: 'getRandomMetric',
        caption: 'Visitors',
      }
    ],
    middleThird: [
      {
        type:'GAMetric',
        cardStyle: 'metric',
        background: '#3EB1AE',
        metric: 'getRandomMetric',
        caption: 'Page views',
      }
    ],
    middleFourth: [
      {
        type:'GAMetric',
        cardStyle: 'metric',
        background: '#0B90B1',
        metric: 'getRandomMetric',
        caption: 'Unique Visitors',
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
        fetchData: {type:'function', name: 'getData'},
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
        fetchData: {type:'function', name: 'getData'},
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
        fetchData: {type:'function', name: 'getData'},
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
        fetchData: {type:'function', name: 'getData'},
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
        fetchData: {type:'function', name: 'getData'},
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
