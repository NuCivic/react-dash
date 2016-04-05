export var settings = {
  title: 'Georgia Reports',
  regions: {
    top: [
     {
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
        fetchData: 'getData'
      },
      {
        header: 'GAChoropleth Test',
        type: 'GAChoropleth',
        settings: {
          colors:['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'pink','violet', 'darkmagenta'],
          cssPath: '/static/choropleth.css',
          showTooltip: {true},
          domainField: 'rate',
          levels: 9,
          domainLower: 0,
          domainUpper: .15,
          width: 1200,
          height: 600,
          domainKey: 'id',
          topoJson: '/data/us.json',
          domainDataUrl: '/data/unemployment.tsv',
          domainDataSep: '\t',
          polygonFeature: 'counties',
          meshFeature: 'states',
          projection: 'albersUsa',
          showGraticule: true
        },
        cardStyle: 'card',
        fetchData: 'getData'
      },
      {
        header: 'GAChoropleth Test ][ - GEOJSON',
        type: 'GAChoropleth',
        settings: {
          colors: ['#f7fcfd','#e5f5f9','#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#006d2c','#00441b'],
          cssPath: '/static/choropleth.css',
          showTooltip: {true},
          domainField: 'zone',
          levels: 10,
          domainLower: 0, //      @@TODO - it might make sense in some circumstance to use fixed bounds 
          domainUpper: 500, //    @@       but we probably just want to programatically get the ranges
          width: 1200,
          height: 600,
          domainKey: 'id',
          domainField: 'Incidents against Women during Accreditation: No #',
          domainDataUrl: '/data/apollo-parsed-1737-325_0.csv',
          geoJson: '/data/zones.geojson',
          domainDataSep: ',',
          polygonFeature: 'zone',
          projection: 'albersUsa',
          showGraticule: true
        },
        cardStyle: 'card',
        fetchData: 'getData'
      },
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
        percentaje: true,
        action: 'maintain_above',
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
        fetchData: 'getData',
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
        fetchData: 'getData',
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
        fetchData: 'getData',
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
        fetchData: 'getData'
      },
      {
        type: 'GATable',
        header: 'Mi titulo',
        fetchData: {
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
        fetchData: 'getData'
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
