import colorbrewer from 'colorbrewer';
import {dateFormatter} from '../src/ReactDashboard';

export var settings = {
  title: 'Georgia Reports',
  components: [
    {
      type: 'Div',
      className: 'row',
      children: [
       {
        type: 'Div',
        className: 'col-md-12',
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
									name: 'NVD3.getChartSeries',
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
         type: 'Div',
         className: 'col-sm-6 col-lg-3',
         children: [
           {
             header: 'Foo',
             type: 'Text',
             content: 'Lets get nesty.'
           }      
         ]
       }
      ]
    },
  ]
};
