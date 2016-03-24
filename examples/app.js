import React, { Component } from 'react';
import {Dashboard} from '../src/ReactDashboard';

export default class GADashboard extends Dashboard {

  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  onAutocompleteChange(payload) {
    console.log(payload.value);
  }

}
