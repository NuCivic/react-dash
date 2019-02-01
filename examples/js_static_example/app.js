/**
 * A very simple Dashboard implementation using
 * a settings object
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { settings } from './settings';
import { Dashboard } from '../../src/ReactDashboard';
import 'fixed-data-table/dist/fixed-data-table.min.css';

/**
 * The settings object is passed as props to the Dashboard component
 **/
document.addEventListener('DOMContentLoaded', function(event) {
    ReactDOM.render(<Dashboard {...settings}/>, document.getElementById('root'));
});
