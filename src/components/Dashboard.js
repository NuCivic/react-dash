import React, { Component } from 'react';
import Registry from '../utils/Registry';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import BaseComponent from './BaseComponent';
import Card from './Card';
import * as actions from '../actions';
import {getOwnQueryParams} from '../utils/utils';

//  Pass the entire redux store to the Dashboard application / component
function mapStateToProps(state, ownProps) {
  // pass the whole state to the Dashboard
  return {
    reduxState: state,
  }
}

//  For now we are making all actions available to all components
function mapDispatchToProps(dispatch) {
  actions.push = browserHistory.push;
  return {
    reduxActions: bindActionCreators(actions, dispatch),
  };
}

// poorMansMapStateToProps - parse store by component id
// @@TODO rename reduxState in params
// @@TODO just call Dashboard components children!!
export function getOwnProps(location, key, settings, reduxActions) {
  console.log('settings', arguments);
  const children = (settings.components) ? settings.components : settings.children;
  const cid = children[key].cid;
  const ownParams = getOwnQueryParams(location, cid);
  let newProps = Object.assign({}, children.children, {reduxActions: reduxActions, location: location, ownParams: ownParams});
  console.log('newProps', newProps);
  return newProps;
}

// @@TODO - pass current route with location
function _getOwnParams(location, cid) {
  console.log('_go', location, cid)
}

class Dashboard extends BaseComponent {
  /**
   * @@TODO
   * @@ Recursively parse settings tree, rendering components
   * and children 
   * @@ This should also parse the store and pass
   * the proper piece of store/state to children
   **/
  walkSettingsTree() {
    // recurse tree
    // render children
    // poorMansMapToProps(); // parse from the store the piece that we need and add to props
  }

  render() {
    let reduxState = this.props.reduxState;
    let reduxActions = this.props.reduxActions;
    console.log('Render DASH', this);
// @@TODO this should work but this triggers render and stack overflow
//    this.props.reduxActions.updateFilter(this.props.location.query);
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
                {React.createElement(Registry.get(element.type),  getOwnProps(this.props.location, key, reduxState.settings, reduxActions))}A
              </Card>
            )
          })}
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
