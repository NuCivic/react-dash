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
        className: 'col-sm-6 col-lg-3',
        children: [
           {
             type: 'Autocomplete',
             name: 'some-name',
             multi: true,
             options: [{ value: 'one', label: 'One' },{ value: 'two', label: 'Two' }]
           },
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
