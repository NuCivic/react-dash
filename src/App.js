import React, { Component } from 'react';
import Dashboard from './Dashboard';
import {datum, state} from './datum';

export default class App extends Component {
  // loadData(){
  //   //...logic to load data here
  //   this.state.context = data
  //   this.setState(state);
  // }

  render() {
    return (
      //context={this.state.data}
      <Dashboard {...state}/>
    );
  }
}
