import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dashboard } from '../src/ReactDashboard';
import { settings } from './settings';

// We use the dashboard to 
export default class MyDashboard extends Dashboard {
  
  // @@TODO We should abstract this data loading to a custom model layer
  // @@TODO and call the appropriate custom loaders on instantiation
  getData() {
		const url = 'http://dev-react-dashboard-demo.pantheonsite.io/api/action/datastore/search.json?resource_id=1899d41c-0715-46d4-9667-d6fd356c4a22&limit=5';
      fetch(url).then(response => {
        return response.json();
      }).then(data => {
        this.setState({ data: data });
      }).catch(e => {
        console.warn('Failed to fetch data', e);
      });
  }
}
