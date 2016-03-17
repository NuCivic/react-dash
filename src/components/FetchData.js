import React, { Component } from 'react';
import EventDispatcher from '../EventDispatcher';
import DashboardConstants from '../constants';

export var FetchData = ComposedComponent => class extends Component {

  componentDidMount() {
    EventDispatcher.handleViewAction({
      actionType: DashboardConstants.EXECUTE,
      reference: this.props.fetchData,
      id: this.props.id
    });
  }

  render() {
    return <ComposedComponent {...this.props} data={this.props.data}/>;
  }
}