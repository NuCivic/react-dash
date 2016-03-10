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
          name: 'getData',
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
          name: 'getData',
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
        data: {
          type: 'function',
          name: 'getTableData'
        },
        settings: {
          table: {
            rowHeight: 50,
            width: 800,
            maxHeight: 5000,
            headerHeight:50
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
            height: 50,
            width: 500,
            overrides: {
              1: {
                height: 60
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
          name: 'getData',
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
          name: 'getData',
        }
      }
    ],
  }
};