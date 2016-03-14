import React, { Component } from 'react';

export var FetchData = ComposedComponent => class extends Component {

  constructor(props) {
    super(props);
    this.state = { data: []};
  }

  componentDidMount() {
    this.getData();
  }

  onData(data) {
    this.setState({data: data});
  }

  getData() {
    Promise.resolve(this.props.context.execute(this.props.data)).then(this.onData.bind(this));
  }

  render() {
    return <ComposedComponent {...this.props} data={this.state.data}/>;
  }
}