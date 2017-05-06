import 'bootstrap/dist/css/bootstrap.min.css';

export var settings = {
  title: 'React-Dash Javascript Settings Example',
  doFilterRouting: false,
  // regions are used by the dashboard to divide
  // the layout into rows using the bootstrap grid
  regions: [
    {
      id: 'metrics-row',
      className: 'row',
      children: [
        // each child is a react component defined by type
        // paramaters are passed as props
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
          header: 'Header 1',
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
          header: 'Header 2',
          iconClass: 'fa fa-cloud',
          className: 'col-md-6',
          key: 'c2',
          data: [{x: 'eeny', y: 110}, {x: 'meeny', y: 920}, {x: 'mo', y: 430}],
          settings: {
            type: 'pieChart',
            height: 300
          },
			},
      // start DataTable Example
      {
        type: 'DataTable',
        header: 'Mi titulo',
        data: 
        [
          [
            {foo: 1, bar: 2},
            {foo: 11, bar: 21},
            {foo: 111, bar: 222},
            {foo: 1, bar: 2},
          ]
        ],
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
          },  
          cells: {
            height: 40, 
            width: 500,
          }
        }
      },
      // end DataTable Example
    ]
   }
 ]
}
