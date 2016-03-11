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
   this.state.context.getAppData(this.state.context.initConfig, data => {
      console.log('CSV cb', data);
      this.setState({appData: data, loading: false});
   });
  },
  render: function () {
    // @@ I think we want to call our cardDataHandlers here hmm
    var layout = (typeof this.props.layout === 'string') ? Registry.get(this.props.layout) : this.props.layout;
    console.log('Dash render', this);
    return (
      React.createElement(layout, this.props)
    );
  }
});

export default Dashboard;
