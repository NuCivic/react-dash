import colorbrewer from 'colorbrewer';
import {dateFormatter} from '../src/ReactDashboard';

export var settings = {
  title: 'Georgia Reports',
  components: [
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
							id:'agh'
						},
  ]
};
