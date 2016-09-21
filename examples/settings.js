let baseUrl = 'http://192.168.99.100:32770';
import {dateFormatter} from '../src/ReactDashboard';

export var settings = {
  queries: {
    by_age: {
      group_by: "age",
      count: "age",
    },
  },
  components: [
    {
      type: 'Region',
      cid: 'r1',
      className: 'row',
      children: [
           {
             type: 'img',
             cid: 'img1',
             className: 'col-md-6',
             src: 'https://dl.dropboxusercontent.com/u/73703010/react_dash_logo_.png',
             style: { maxWidth: '200px'},
           },
           {
             type: 'p',
             cid: 'html1',
             className: 'col-md-6',
             dangerouslySetInnerHTML: {__html: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?'},
             style: {marginTop: '1em', width: '100%', margin: '1em'}
           },
      ]
    },
    // the action listener will re-render the multi-component with the selected value
    // as the multi-components initVal
    // Target the multicomponent by its id field
    // in app.js we use id to determine the update type and the target (app.js)
    {
      type: 'Autocomplete',
      cid: 'ac1',
      placeholder: 'Select to repopulate Multi-component, below',
      style: {marginBottom: '1em'},
      id: 'multicomponent-multi',
      name: 'multicomponent-multi',
      options: [{value: 'a', label: 'a'}, {value: 'b', label: 'b'}]
    },
    {
      header: 'Multi Component',
      type: 'Multi',
      cid: 'm1',
      id: 'multicomponent',
      cardStyle: 'content',
      style: {padding: '1em', background: '#DAEEF5'},
      initVal: 'a',
      filters: [
        {
          type: 'ReactSelect',
          cid: 0,
          multi: true,
          options: [
            {
              label: 'a',
              value: 'a'
            },
            {
              label: 'b',
              value: 'b'
            },
          ],
          dataHandlers: [{name: 'common.getEventReturn'}]
        }
      ],
        elements: {
          a: [ // each set of elements is an array - even if it contains a single child
            {
              type: 'h2',
              cid: 'html2',
              dangerouslySetInnerHTML: { __html: "Component A" }
            }	
          ],
          b: [ 
          {
            type: 'h2',
            cid: 'html3',
            dangerouslySetInnerHTML: { __html: 'Component B'}
          }
          ]
        }
    }, 
    {
      type: 'Region',
      cid: 'r5',
      children: [
        {
          type: 'Metric',
          cid: 'met1',
          cardStyle: 'metric',
          value: 'Value from Config',
          background: 'muave',
          iconClass: 'glyphicons glyphicons-link'
        },
        {
          type: 'Metric',
          cid: 'met2',
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
      cid: 'ch1',
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
          cid: 0,
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
	 	{
     type: 'Region',
     cid: 'r6',
     header: 'Unemployment by U.S. County',
     children: [
        {
          type: 'h4',
          cid: 'html45',
          dangerouslySetInnerHTML: {__html: 'Choropleth Heat Map -- topojson'}
        },
        {
          type: 'Choropleth',
          cid: 'choro1',
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
          cid: 'r650',
          children: [
            {
              type: 'Goal',
              cid: 'g1',
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
              cid: 'g2',
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
      cid: 'r131',
      children: [
				{
          header: 'This is an awesome text',
					type: 'Text',
          cid: 'html111',
					content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat dui, sodales eleifend placerat a, dictum sed tortor.</p><p> Quisque porttitor urna in est vehicula, a molestie nunc pharetra. Cras vehicula nisi dui, ut aliquam nunc vulputate lacinia. Curabitur vitae interdum dolor, sed venenatis tellus. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat metus et ipsum lobortis, at porttitor nunc laoreet.</p><p>Nullam et ligula at enim pretium accumsan. In et facilisis enim, vel consectetur justo. Duis eleifend sit amet neque eu interdum. Sed ornare orci diam, ac finibus ipsum posuere vel. Duis maximus velit ipsum, et mattis massa tempus sit amet. Suspendisse potenti.</p>',
				},
				{
					type: 'DataTable',
          cid: 'dt1',
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
      cid: 'r344',
      children: [
        {
          type: 'Chart',
          cid: 'chart12',
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
        },
       {
              type: 'Chart',
              className: 'col-md-6',
              cardStyle: 'chart',
              header: 'NVD3 Discrete Bar Chart',
              settings: {
                type: 'discreteBarChart',
                x: 'label',
                y: 'value',
                rotateLabels: -45,
                color: ['#b3f0ff', '#99ebff', '#80e5ff', '#66e0ff', '#4ddbff'],
              },
              data:
              [ 
              { key: 'Chart key',
                values: 
                [
                  {label: 'Yes', value: 100000},
                  {label: 'No', value: 90},
                  {label: 'Maybe', value: 45},
                  {label: 'Unknown', value: 20}
                ]
              }
              ]
        } 
      ]
    }
  ]
};
