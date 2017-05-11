import 'bootstrap/dist/css/bootstrap.min.css';

export var settings = {
  title: 'React-Dash Javascript Settings Example',
  doFilterRouting: false,
  // regions are used by the dashboard to divide
  // the layout into rows using the bootstrap grid
  regions: [

    {
      id: 'text-row',
      className: 'row',
      children: [
        {
          type: 'DataTable',
          header: 'Mi titulo',
          cardClasses: ['col-md-6'],
          key:"my_table",
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
            rows: {
              height: 40,
            }
          }
        }
      ]
    },

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
          key:"caption_1"
        },
        {
          type: 'Metric',
          caption: 'Caption A',
          cardStyle: 'metric',
          iconClass: 'fa fa-bed',
          data: [2],
          background: '#689994',
          className: 'col-md-4',
          key:"caption_1"
        },
        {
          type: 'Metric',
          caption: 'Caption A',
          cardStyle: 'metric',
          iconClass: 'fa fa-bed',
          data: [3],
          key:"caption_2",
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
        type: 'DataTable2',
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
          rows: {
            height: 40, 
          }
        },
        overrides: {
          // target table columns with custom attributes
          // use column header name as key
          columns: {
            bar: {
              flexGrow: 9,
              className: 'greenCell'
            },
          },
          // target table rows with custom attributes
          // use row index as key
          rows: {
            1: {
              className: 'yellow'
            }  
          },
          // target individual cells with custom attributes
          // define key using coordinate: headerName_rowIndex 
          cells: {
            foo_1: {
              className: 'red'
            },
          }
        },
      },
      // end DataTable Example
    ]
   }
 ]
}
