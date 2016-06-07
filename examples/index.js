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
import MyCustomLayout from './layouts/MyCustomLayout';
import GADashboard from './app';
import GeojsonChoropleth from './components/GeojsonChoropleth';
import GAMultiSelect from './components/GAMultiSelect';

ReactDOM.render(<GADashboard {...settings} layout={MyCustomLayout}/>, document.getElementById('root'));
