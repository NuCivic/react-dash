import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { settings } from './settings';
import { Dashboard } from '../../src/ReactDashboard';
import 'fixed-data-table/dist/fixed-data-table.min.css';

document.addEventListener('DOMContentLoaded', function(event) {
    ReactDOM.render(<Dashboard {...settings}/>, document.getElementById('root'));
});
