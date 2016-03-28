// This is the initialState of the application. It holds all the
// required information to create the dashboard. This should be passed
// to the store constructor.

export var initialState = {
  title: 'Georgia Reports',
  context: 'AppContext',
  fetchData: {
    type: 'function',
    name: 'bla',
  },
  regions: {
    top: [
      {
        id: 'autocomplete',
        type: 'Autocomplete',
        name: 'some-name',
        multi: true,
        url: 'http://localhost:3004/options?q={{keyword}}',
        context: 'AutocompleteContext',
        onChange: {
          type: 'action',
          actionType: 'AUTOCOMPLETE_CHANGE'
        },
        cardStyle: 'none'
      },
      {
        id: 'mainChart',
        header:'Top',
        type: 'Chart',
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
        fetchData: {
          type: 'function',
          name: 'getData',
          args: [
            ['value', 'label']
          ]
        }
      }
    ],
    middleFirst: [
      {
        id: 'newUsers',
        type:'Metric',
        cardStyle: 'metric',
        background: '#9F3E69',
        getMetric: {
          type: 'function',
          name: 'getRandomMetric'
        },
        caption: 'New Users',
      }
    ],
    middleSecond: [
      {
        id: 'visitors',
        type:'Metric',
        cardStyle: 'metric',
        background: '#F3BA4F',
        getMetric: {
          type: 'function',
          name: 'getRandomMetric'
        },
        caption: 'Visitors',
      }
    ],
    middleThird: [
      {
        id: 'pageViews',
        type:'Metric',
        cardStyle: 'metric',
        background: '#3EB1AE',
        getMetric: {
          type: 'function',
          name: 'getRandomMetric'
        },
        caption: 'Page views',
      }
    ],
    middleFourth: [
      {
        id: 'uniqueVisitors',
        type:'Metric',
        cardStyle: 'metric',
        background: '#0B90B1',
        getMetric: {
          type: 'function',
          name: 'getRandomMetric'
        },
        caption: 'Unique Visitors',
      }
    ],
    left: [
      {
        id: 'leftChart',
        header:'Left',
        iconClass: 'glyphicon glyphicon-fire',
        type: 'Chart',
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
        fetchData: {
          type: 'function',
          name: 'getData'
        }
      },
      {
        id: 'table',
        type: 'Table',
        fetchData: {
          name: 'getTableData'
        },
        cardStyle: 'table',
        settings: {
          table: {
            rowHeight: 50,
            width: 800,
            maxHeight: 5000,
            headerHeight:50
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
            height: 50,
            width: 500,
            overrides: {
              1: {
                height: 60
              }
            }
          }
        }
      },
    ],
    right: [
      {
        id: 'rightChart',
        header:'Right!',
        type: 'Choropleth',
        iconClass: 'glyphicon glyphicon-exclamation-sign',
        cardStyle: 'Choropleth',
				fetchData: {
					type: 'function',
          name: 'getChoroplethData'
				},
        settings: {
          css: '.q0-9 { fill:rgb(247,251,255); } \
           .q1-9 { fill:rgb(222,235,247); } \
           .q2-9 { fill:rgb(198,219,239); } \
           .q3-9 { fill:rgb(158,202,225); } \
           .q4-9 { fill:rgb(107,174,214); } \
           .q5-9 { fill:rgb(66,146,198); } \
           .q6-9 { fill:rgb(33,113,181); } \
           .q7-9 { fill:rgb(8,81,156); } \
           .q8-9 { fill:rgb(8,48,107); }'
          ,
          tooltipContent: function (d) { console.log('tt',d.properties[d.id]); return {rate: d.properties[d.id]}; }, 
          showTooltip: {true},
					domainValue: function(d) { return +d.rate; },
					domainKey: function(d) {return +d.id},
					mapKey: function(d) {return +d.id},
				  width: 1200,
				  height: 750,
				  scale: 1280,
          cssPath: '/static/choropleth.css',
				  translate: [1200 / 2, 750 / 2],
			    projection: 'albersUsa',
					showGraticule: true
        }
      },
      {
        id: 'text',
        header: 'This is an awesome text',
        type: 'Text',
        content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat dui, sodales eleifend placerat a, dictum sed tortor.</p><p> Quisque porttitor urna in est vehicula, a molestie nunc pharetra. Cras vehicula nisi dui, ut aliquam nunc vulputate lacinia. Curabitur vitae interdum dolor, sed venenatis tellus. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat metus et ipsum lobortis, at porttitor nunc laoreet.</p><p>Nullam et ligula at enim pretium accumsan. In et facilisis enim, vel consectetur justo. Duis eleifend sit amet neque eu interdum. Sed ornare orci diam, ac finibus ipsum posuere vel. Duis maximus velit ipsum, et mattis massa tempus sit amet. Suspendisse potenti.</p>',
        cardStyle: 'card',
      }
    ],
  }
};
