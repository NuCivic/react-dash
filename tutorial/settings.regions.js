export var settings = {
  title: 'Regions & Metrics',
  components: [
    {
      type: 'Chart',
      cardStyle: 'Chart',
      header: 'My Pie Chart',
      data: [[{x: 1, y: 40}, {x: 2, y: 40}, {x: 3, y: 20}]],
      dataHandlers: ['NVD3.toPieChartSeries'],
      settings: {
        type: 'pieChart',
        x: 'x',
        y: 'y',
        height: '600'
      },
    },
    {
      type: 'Region',
      className: 'row', // row class is used by twitter Bootstrap
      children: [
        {
          type: 'Metric',
          cardStyle: 'Metric',
          iconClass: 'fa fa-level-up',
          className: 'col-md-4', // col class used by twitter Bootstrap
          caption: 'Test A',
          data: ['A'] // an arbitrary value for our example
        },
        {
          type: 'Metric',
          cardStyle: 'Metric',
          iconClass: 'fa fa-level-down',
          className: 'col-md-4',
          background: '#53ACC9',
          caption: 'Test B',
          data: ['B']
        },
        {
          type: 'Metric',
          cardStyle: 'Metric',
          iconClass: 'fa fa-fire',
          caption: 'Test C',
          background: '#C97053',
          className: 'col-md-4',
          data: ['C']
        }
      ]
    }
  ]
}
