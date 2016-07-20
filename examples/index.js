import 'bootstrap/dist/css/bootstrap.min.css';
import 'nvd3/build/nv.d3.min.css';
import 'react-select/dist/react-select.min.css';
import 'fixed-data-table/dist/fixed-data-table.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { settings } from './settings';
import GAChart from './components/GAChart';
import GATable from './components/GATable';
import GAMetric from './components/GAMetric';
import GAGoal from './components/GAGoal';
import GAChoropleth from './components/GAChoropleth';
import MyCustomLayout from './layouts/MyCustomLayout';
import GADashboard from './app';
import GAMultiSelect from './components/GAMultiSelect';
import AppFactory from '../src/components/App';

console.log('DASHBOARD SETTINGS', settings);
let App = AppFactory(settings);

// App = AppFactory(settings);
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<App {...settings} />, document.getElementById('root'));
