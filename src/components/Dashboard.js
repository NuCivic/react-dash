import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import Card from './Card';
import { pick } from 'lodash';

/**
 * @@TODO Currently in practice this only handles regions
 * MOST OF THIS LOGIC IS REPRODUCE IN THE Region Component
 * We should refactor so this is not the case
 */
export default class Dashboard extends BaseComponent {
  /**
   * Apply filters to Dashboard
   * @param payload.id {string} 'autocomplete-FIELDNAME'
   */
  onAction(payload) {
    console.log('oA0', payload);
    switch(payload.actionType) {
      case 'AUTOCOMPLETE_CHANGE':
        let field = payload.id.split('-')[1];
        let values = payload.value.map(v => {return v.value});
        let filters = values.map((v,k) => {
          return v;
        });
        
        // overwrite filter array for given field
        let appliedFilters = Object.assign({}, this.state.appliedFilters);
        appliedFilters[field] = filters;
        
        // assign appliedFilters to data for use in dataHandlers
        let appData = Object.assign({}, this.state.data);
        appData.appliedFilters = appliedFilters;
        
        // go
        this.setState({ appliedFilters: appliedFilters });
        break;
     } 
  }
  
  render() {
    let markup;
    console.log('DASH RENDER', this);
    let routeParams = pick(this.props, ['history', 'location', 'params', 'route', 'routeParams', 'routes']);
    // We wrap the whole dashboard in the route so we that we get paramater info in the els
    // @@TODO this needs to be repeated in Region because of our dumb scheme
    return (
        <div className="container">
          <h1 className="dashboard-title">{this.props.title}</h1>
          {this.props.components.map((element, key) => {
            let props = Object.assign(this.props.components[key], {globalData: this.state.data}, routeParams);
            let output;
            
            if (props.cardStyle) {
              output = 
                <Card key={key} {...element}>
                  {React.createElement(Registry.get(element.type), Object.assign(this.props.components[key], props))}
                </Card>
            } else {
              output = 
                React.createElement(Registry.get(element.type), Object.assign(this.props.components[key], props))
            }
            return output;
          })}
        </div>
    );
  }
}
