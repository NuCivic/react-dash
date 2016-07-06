import colorbrewer from 'colorbrewer';
import {dateFormatter} from '../src/ReactDashboard';

export var settings = {
  title: 'Georgia Reports',
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
       {
        type: 'Region',
        className: 'first-row col-md-12',
        children: [
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
                      label: 'foo',
                      value: 'foo'
                    },
                    {
                      label: 'bar',
                      value: 'bar'
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
							id:'agh'
						},
						{
							type: 'Choropleth',
							format: 'geojson',
							fetchData: {
								url: './data/apollo-parsed-1737-325_0.csv',
								type: 'backend',
								backend: 'csv',
								// delimiter: '\t'
							},
							id: 'Choropleth',
							dataKeyField: 'Zone',
							dataValueField: 'Total Observers',
							geometryKeyField: 'name',
							geometry: './data/zones.geojson', // topojson or geojson
							projection: 'equirectangular', // https://github.com/d3/d3/wiki/Geo-Projections
							scaleDenominator: .7,
							borderColor: '#000000',
							noDataColor: '#F3F3F3',
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
							// customMin: '',
							// customMax: '',
							// topologyObject: 'counties'
						},
						{
							header: 'A Multi Component',
							type: 'GAMultiSelect',
								initialSelection: 'a', // Which key of the elements array to render when component mounts, or null to render nothing initially
								elements: {
									a: [ // each set of elements is an array - even if it contains a single child
										{
											type: 'GATable',
											header: 'TABLE AAA',
											key: '1a', // arbitrary unique key for react rendering
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
									b: [
										{
											type:'GAMetric',
											key: '2a',
											cardStyle: 'metric',
											background: '#9F3E69',
											metric: 'getRandomMetric',
											caption: 'Get Multi',
											iconClass: 'glyphicon glyphicon-user'
										},
										{
											type:'GAMetric',
											cardStyle: 'metric',
											background: 'cyan',
											metric: 'getRandomMetric',
											caption: 'Get Multi ii',
											key: '2b',
											iconClass: 'glyphicon glyphicon-tint'
										}
									]
								}
						}
        ]
       },
       {
         type: 'Region',
         className: 'second-row row',
         children: [
           {
             type: 'Region',
             className: 'col-sm-6 col-lg-3',
             children: [
								{
									type:'GAMetric',
									cardStyle: 'metric',
									background: '#9F3E69',
									metric: 'getRandomMetric',
									caption: 'New Users',
									iconClass: 'glyphicon glyphicon-user'
								}  
             ]
           },
           {
             type: 'Region',
             className: 'col-sm-6 col-lg-3',
             children: [
								{
									type:'GAMetric',
									cardStyle: 'metric',
									background: '#F3BA4F',
									metric: 'getRandomMetric',
									caption: 'Visitors',
									iconClass: 'glyphicon glyphicon-heart'
								}
						 ]
           },
           {
             type: 'Region',
             className: 'col-sm-6 col-lg-3',
             children: [
								{
									type:'GAMetric',
									cardStyle: 'metric',
									background: '#3EB1AE',
									metric: 'getRandomMetric',
									caption: 'Page views',
									iconClass: 'glyphicon glyphicon-star'
								}
						 ]
           },
           {
             type: 'Region',
             className: 'col-sm-6 col-lg-3',
             children: [
								{
									type:'GAMetric',
									cardStyle: 'metric',
									background: '#0B90B1',
									metric: 'getAVGPrice',
									caption: 'Unique Visitors',
									iconClass: 'glyphicon glyphicon-road',
									fetchData: {type: 'function', name: 'getCustomData'}
								}
						 ]
           },
         ]
       },
       {
         type: 'Region',
         className: 'third-row row',
         children: [
           {
             type: 'Region',
             className: 'goals-first col-md-4',
             children: [
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
						 ]
           },
           {
             type: 'Region',
             className: 'goals-second col-md-4',
             children: [
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
						 ]
           },
           {
             type: 'Region',
             className: 'goals-third col-md-4',
             children: [
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
						 ]
           },
         ]
       },
       {
         type: 'Region',
         className: 'fourth-row row',
         children: [
           {
             type: 'Region',
             className: 'col-md-6',
             children: [
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
              ]
            },
            {
              type: 'Region',
              className: 'col-md-6',
              children: [
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
              ]
            }
         ]
      },
    ]
  }
  ]
};
