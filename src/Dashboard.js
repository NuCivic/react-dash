import React, { Component } from 'react';
import Geary from './layouts/Geary';
import Registry from './Registry';

let Dashboard = React.createClass({
  getInitialState: function () {
    let props = Object.assign({}, this.props);
    props.loading = true;
    console.log('Dash Props', props);
    return props;
  },
  componentDidMount: function () {
   console.log('Dash didMount', this);
   this.state.context.getAppData({url: 'http://demo.getdkan.com/sites/default/files/us_foreclosures_jan_2012_by_state_0.csv'}, data => {
      console.log('CSV cb', data);
      this.setState({appData: data, loading: false});
   });
  },
  render: function () {
    console.log('Dash render', this);
    var layout = (typeof this.props.layout === 'string') ? Registry.get(this.props.layout) : this.props.layout;
    return (
      React.createElement(layout, this.props)
    );
  }
});

export default Dashboard;
