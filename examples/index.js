import React from 'react';
import ReactDOM from 'react-dom';
import { settings } from './settings';
import GAChart from './components/GAChart';
import GATable from './components/GATable';
import GAMetric from './components/GAMetric';
import MyCustomLayout from './layouts/MyCustomLayout';
import GADashboard from './app';

import '../bower_components/bootstrap/dist/css/bootstrap.min.css';
import 'nvd3/build/nv.d3.min.css';
import 'react-select/dist/react-select.min.css';
import 'fixed-data-table/dist/fixed-data-table.min.css';
import '../src/css/card.css';

ReactDOM.render(<GADashboard {...settings} layout={MyCustomLayout}/>, document.getElementById('root'));
