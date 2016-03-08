import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Autocomplete from './Autocomplete';
import Geary from './layouts/Geary';
import {datum, state} from './datum';

export default class App extends Component {


  onDataLoaded(){
    //...logic to load data here
    // this.state.context = data
    // this.setState(state);
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange(value) {
    console.log(value);
  }

  render() {
    return (
      <div>
        <Dashboard context={this.state} {...state} layout={Geary}/>
      </div>
    );
  }
}
