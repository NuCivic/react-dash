import 'bootstrap/dist/css/bootstrap.min.css';
import 'nvd3/build/nv.d3.min.css';
import 'react-select/dist/react-select.min.css';
import 'fixed-data-table/dist/fixed-data-table.min.css';
import ReactDOM from 'react-dom';
import React from 'react';
import customDataHandlers from './customDataHandlers';
import { settings } from './settings';
import App from './App';
import { Router, Route, browserHistory } from 'react-router';

console.log('JJ', jeckyll);

ReactDOM.render(<App />, document.getElementById('root'));
