import 'bootstrap/dist/css/bootstrap.min.css';

export var settings = {
  title: 'React-Dash Javascript Settings Example',
  regions: [
    {
      id: 'metrics-row',
      className: 'row',
      children: [
        {
          type: 'Metric',
          caption: 'Caption A',
          cardStyle: 'metric',
          iconClass: 'fa fa-bed',
          data: [1],
          background: '#687a99',
          className: 'col-md-4',
        },
        {
          type: 'Metric',
          caption: 'Caption A',
          cardStyle: 'metric',
          iconClass: 'fa fa-bed',
          data: [2],
          background: '#689994',
          className: 'col-md-4',
        },
        {
          type: 'Metric',
          caption: 'Caption A',
          cardStyle: 'metric',
          iconClass: 'fa fa-bed',
          data: [3],
          background: '#8f6899',
          className: 'col-md-4',
        }
      ]
    },
    {
      id: 'charts-row',
      className: 'row',
      children: [
        {
          type: 'Chart',
          cardStyle: 'chart',
          header: 'Foo',
          iconClass: 'fa fa-cloud',
          className: 'col-md-6',
          key: 'c1',
          data: [{x: 'foo', y: 10}, {x: 'bar', y: 20}, {x: 'baz', y: 30}],
          settings: {
            type: 'pieChart',
            height: 300
          }
        },
        {
          type: 'Chart',
          cardStyle: 'chart',
          header: 'Eeny',
          iconClass: 'fa fa-cloud',
          className: 'col-md-6',
          key: 'c2',
          data: [{x: 'eeny', y: 110}, {x: 'meeny', y: 920}, {x: 'mo', y: 430}],
          settings: {
            type: 'pieChart',
            height: 300
          }
        }
      ]
    }
  ]
}
