export var settings = {
  title: 'Hello World',
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
    }
  ]
}
