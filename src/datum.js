import Registry from './Registry';

Registry.set('getData', function getData(args){
  return datum;
});

export var datum = [{
    key: "Cumulative Return",
    values: [
      {
        "label" : "A" ,
        "value" : -29.765957771107
      } ,
      {
        "label" : "B" ,
        "value" : 0
      } ,
      {
        "label" : "C" ,
        "value" : 32.807804682612
      } ,
      {
        "label" : "D" ,
        "value" : 196.45946739256
      } ,
      {
        "label" : "E" ,
        "value" : 0.19434030906893
      } ,
      {
        "label" : "F" ,
        "value" : -98.079782601442
      } ,
      {
        "label" : "G" ,
        "value" : -13.925743130903
      } ,
      {
        "label" : "H" ,
        "value" : -5.1387322875705
      }
    ]
  }
];

export var state = {
  title: '',
  layout:'Layout',
  regions: {
    left: [
      {
        title:'Left',
        type: 'Chart',
        settings: {
          id:'lineChart',
          type: 'discreteBarChart',
          x: 'label',
          y: 'value'
        },
        data: {
          datum: 'getData',
          args: {
            url: 'http://data.com/data.json'
          }
        }
      }
    ],
    right: [
      {
        title:'Right',
        type: 'Chart',
        settings: {
          id:'barChart',
          type: 'discreteBarChart',
          x: 'label',
          y: 'value'
        },
        data: {
          datum: 'getData',
          args: {}
        }
      }
    ],
    top: [
      {
        title:'Top',
        type: 'Chart',
        settings: {
          id:'lineChart2',
          type: 'discreteBarChart',
          x: 'label',
          y: 'value'
        },
        data: {
          datum: 'getData',
          args: {
            fields: ['value', 'label']
          }
        }
      }
    ],
    bottom: [
      {
        title:'Bottom',
        type: 'Chart',
        settings: {
          id:'barChart2',
          type: 'discreteBarChart',
          x: 'label',
          y: 'value'
        },
        data: {
          datum: 'getData',
          args: {}
        }
      }
    ],
  }
};