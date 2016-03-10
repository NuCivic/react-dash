export var store = {
  title: '',
  layout:'Geary',
  regions: {
    left: [
      {
        header:'Left',
        type: 'Chart',
        settings: {
          id:'lineChart',
          type: 'discreteBarChart',
          x: 'label',
          y: 'value'
        },
        data: {
          type: 'function',
          name: 'getChartTopData',
          args: [
            'http://data.com/data.json'
          ]
        }
      },
    ],
    right: [
      {
        header:'Right',
        type: 'Chart',
        settings: {
          id:'barChart',
          type: 'discreteBarChart',
          x: 'label',
          y: 'value'
        },
        data: {
          type: 'function',
          name: 'getChartLeftData',
        }
      }
    ],
    top: [
      {
        type: 'Autocomplete',
        name: 'some-name',
        multi: true,
        url: 'http://localhost:3004/options?q={{keyword}}',
        onChange: {
          type: 'function',
          name: 'onAutocompleteChange'
        },
      },
      {
        type: 'Table',
        rowHeight: 30,
        width: 800,
        maxHeight: 5000,
        headerHeight:50,
        data: {
          type: 'function',
          name: 'getTableData'
        },
        settings: {
          table: {
            columns: {
              cells: {

              }
            }
          }
        }
      },
      {
        header:'Top',
        type: 'Chart',
        settings: {
          id:'lineChart2',
          type: 'discreteBarChart',
          x: 'label',
          y: 'value',
          height: 400
        },
        data: {
          type: 'function',
          name: 'getChartRightData',
          args: [
            ['value', 'label']
          ]
        }
      }
    ],
    middle: [
      {
        header:'Bottom',
        type: 'Chart',
        settings: {
          id:'barChart2',
          type: 'discreteBarChart',
          x: 'label',
          y: 'value'
        },
        data: {
          type: 'function',
          name: 'getChartBottomData',
        }
      }
    ],
  }
};
