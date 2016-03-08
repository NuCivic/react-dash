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
  }

  onChange(value) {
    console.log(value);
  }

  render() {
    return (
      <div>
        <Autocomplete name="form-field-name" multi={true} url="http://localhost:3004/options?q={{keyword}}" onChange={this.onChange} />
        <Dashboard {...state} layout={Geary}/>
      </div>
    );
  }
}
