import React, { Component } from 'react';
import Registry from '../utils/Registry';
import {connect} from 'react-redux';
import BaseComponent from './BaseComponent';
import Card from './Card';

function mapStateToProps(state, ownProps) {
  console.log('MAP', state, ownProps);
  return {
    query: ownProps.location.query
  }
}

function mapDispatchToProps(dispatch) {
  console.log('DISPATCH',dispatch)
  return {};
}

class Dashboard extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {data: []};

    console.log('Dash', this);
  }
  
  /**
   * Recursively parse settings tree, rendering components
   * and children
   **/
  walkSettingsTree() {
    // recurse tree
    // render children
  }
  
  render() {
    let markup;
    let props = Object.assign({globalData: this.state.data || [], q: this.state.q}, this.props.route || this.props);
    if (props.layout) {
      let layout = (typeof this.props.layout === 'String') ? Registry.get(this.props.layout) : this.props.layout;
      return (
        <div className="container">
          <h1 className="dashboard-title">{this.props.title}</h1>
          {React.createElement(layout, props)}
        </div>
      );
    } 
    
    return (
        <div className="container">
          <h1 className="dashboard-title">{this.props.title}</h1>
          {props.components.map((element, key) => { 
            return (
              <Card key={key} {...element}>
                {React.createElement(Registry.get(element.type), Object.assign(props.components[key], {query: this.props.query}))}
              </Card>
            )
          })}
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
