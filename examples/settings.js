import colorbrewer from 'colorbrewer';
import {dateFormatter} from '../src/ReactDashboard';

export var settings = {
  title: 'Georgia Reports',
  components: [
    {
      type: 'Region',
      cid: 'region1',
      className: 'row',
      children: [
       {
        type: 'Region',
        cid: 'region2',
        className: 'zeroth-row col-md-6',
        children: [
           {
             type: 'img',
             cid: 'img1',
             src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTd9zBTlpPrH5EaWGrQISVCjA1E3AAzXCI_go0ml5QHI-58Cld73VBBRv8",
             style: {borderStyle:'double',borderWidth: '10px', borderColor:'teal', padding: '10px', margin: '10px'},
           },
        ]
       },
       {
        type: 'Region',
        cid: 'region3',
        className: 'zeroth-row col-md-6',
        children: [
           {
             type: 'h4',
             cid: 'h41',
             dangerouslySetInnerHTML: {__html: 'A text description set from the settings file, using native react html element.'},
             style: {margin: '20px'}
           },
        ]
       },
       {
        type: 'Region',
        cid: 'region4',
        className: 'first-row col-md-12',
        children: [
           {
              type: 'Autocomplete',
              cid: 'auto1',
              name: 'some-name',
              multi: true,
              options: [{ value: 'one', label: 'One' },{ value: 'two', label: 'Two' }]
            },
						{
							header:'Top',
							type: 'GAChart',
              cid: 'chart1',
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
                  cid: 'ch1Sel',
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
                    'passThroughHandler',
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
                {
                  type: 'ReactSelect',
                  cid: 'ch2Sel',
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
                    'passThroughHandler',
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
							type: 'Choropleth',
              cid: 'map1',
							format: 'geojson',
							fetchData: {
								url: '/data/apollo-parsed-1737-325_0.csv',
								type: 'backend',
								backend: 'csv',
								// delimiter: '\t'
							},
							id: 'Choropleth',
							dataKeyField: 'Zone',
							dataValueField: 'Total Observers',
							geometryKeyField: 'name',
							geometry: '/data/zones.geojson', // topojson or geojson
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
              cid: 'multi1',
							type: 'GAMultiSelect',
								initialSelection: 'a', // Which key of the elements array to render when component mounts, or null to render nothing initially
								elements: {
									a: [ // each set of elements is an array - even if it contains a single child
										{
											type: 'GATable',
                      cid: 'multi1Table1',
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
                      cid: 'multi1Metric1',
											key: '2a',
											cardStyle: 'metric',
											background: '#9F3E69',
											metric: 'getRandomMetric',
											caption: 'Get Multi',
											iconClass: 'glyphicon glyphicon-user'
										},
										{
											type:'GAMetric',
                      cid: 'multi1Metric2',
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
         cid: 'region5',
         className: 'second-row row',
         children: [
           {
             type: 'Region',
             cid: 'region6',
             className: 'col-sm-6 col-lg-3',
             children: [
								{
									type:'GAMetric',
                  cid: 'metric1',
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
             cid: 'region7',
             className: 'col-sm-6 col-lg-3',
             children: [
								{
									type:'GAMetric',
                  cid: 'region8metric1',
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
             cid: 'region8',
             className: 'col-sm-6 col-lg-3',
             children: [
								{
									type:'GAMetric',
                  cid: 'region8metric1',
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
             cid: 'region9',
             className: 'col-sm-6 col-lg-3',
             children: [
								{
									type:'GAMetric',
                  cid: 'region9metric1',
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
         cid: 'region10',
         className: 'third-row row',
         children: [
           {
             type: 'Region',
             cid: 'region11',
             className: 'goals-first col-md-4',
             children: [
								{
									type: 'GAGoal',
                  cid: 'region11goal1',
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
             cid: 'region12',
             className: 'goals-second col-md-4',
             children: [
								{
									type: 'GAGoal',
                  cid: 'region12goal1',
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
             cid: 'region13',
             className: 'goals-third col-md-4',
             children: [
								{
									type: 'GAGoal',
                  cid: 'region13goal1',
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
         cid: 'region14',
         className: 'fourth-row row',
         children: [
           {
             type: 'Region',
             cid: 'region15',
             className: 'col-md-6',
             children: [
								{
									header:'Left',
									iconClass: 'glyphicon glyphicon-fire',
									type: 'GAChart',
                  cid: 'region15chart1',
                  filters: [
                    {
                      type: 'ReactSelect',
                      cid: 'r15Sel1',
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
                      dataHandlers: []
                    }
                  ],
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
                  cid: 'region15table1',
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
              cid: 'region16',
              className: 'col-md-6',
              children: [
								{
									header:'Right',
									type: 'GAChart',
                  cid: 'region16chart1',
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
                  cid: 'region16chart1',
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
