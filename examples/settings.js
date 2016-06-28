import colorbrewer from 'colorbrewer';
import {dateFormatter} from '../src/ReactDashboard';

export var settings = {
  title: 'Georgia Reports',
  components: [
         {
           type: 'Autocomplete',
           name: 'some-name',
           multi: true,
           options: [{ value: 'one', label: 'One' },{ value: 'two', label: 'Two' }]
         },
  ]
};
