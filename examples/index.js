import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import '../bower_components/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/nvd3/build/nv.d3.min.css';
import '../node_modules/react-select/dist/react-select.min.css';
import '../node_modules/fixed-data-table/dist/fixed-data-table.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
