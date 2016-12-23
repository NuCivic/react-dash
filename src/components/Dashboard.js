import React, { Component } from 'react';
import { Card, BaseComponent, Dataset, DataHandler, DataHandlers, Registry, EventDispatcher } from '../ReactDashboard';
import { isArray, isEqual, pick} from 'lodash';

export default class Dashboard extends BaseComponent {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    super.componentWillMount();
    this.getDashboardData();
  }

  componentDidUpdate(nextProps, nextState) {
    if (!isEqual(nextState.appliedFilters, this.state.appliedFilters)) {
      this.getDashboardData();
    }
  }
  
  /**
   * Apply datahandlers in sequence, passing data returned to subsequent handler
   *    makes global leve data and @@TODO event object available to ahndler
   **/
  applyDataHandlers(datahandlers, componentData=[]) {
    let _handlers = datahandlers;
    let _appliedFilters = this.state.appliedFilters || {};
    let _data = DataHandler.handle.call(this, _handlers, componentData, this.state.data, {e:'foo'}, _appliedFilters);
    return _data;
  }

  /**
   * Override this method in your application and insert data fetching stuff here!
   *    API integrations
   *    Flat file Loading
   *    Whatever you want
   **/
  getDashboardData() {
    console.log('Warning. getDashboardData should be defined in your application which extends this dashboard component. getDashboardData should return an object with dataKeys. See @@LINK');
  }

  
  /**
   * Maps data to components based on component settings
   **/
  getChildData(component) {
    let data = [];

    if (component.dataHandlers) {
      data = this.applyDataHandlers(component.dataHandlers, component.data);
    } else if (component.data) {
      if (component.data.length > 0) {
        data = component.data;
      }
    }
    
    return data;
  }
  
  /**
   * Figure out which appliedFilters apply to which dataKeys
   **/
  getFilters(key) {
    let filters = [];
    let appliedFilters = Object.assign({}, this.state.appliedFilters);
    let toFilter = Object.keys(appliedFilters).filter(k => { 
      let next = appliedFilters[k];
      if (next && next.willFilter && next.willFilter.length > 0 ) {
        let will = next.willFilter.indexOf(key);
        return (will >= 0);
      }
    });
    
    toFilter.forEach(filter => {
      let addThis = {};
      let vals = appliedFilters[filter].value.map(row  => {
        return (!isNaN(row.value)) ? parseInt(row.value) : row.value;
      })
      addThis[filter] = vals;
      filters.push(addThis);
    });

    return filters;
  }

  /**
   * Handle actions here.
   *    Update appliedFilters on state triggers re-render
   *    App parses appliedFilters and updates dash accordingly
   **/
  onAction(payload) {
    console.log('ACT', payload, this);
    switch(payload.actionType) {
      case 'AUTOCOMPLETE_CHANGE':
        let appliedFilters = Object.assign({}, this.state.appliedFilters);
        let field = payload.field;
        
        // payload value is a non-empty array of values
        if (isArray(payload.value) && payload.value.length > 0) {
          payload.vals = payload.value.map(row => {
            if (!isNaN(row.value)) return parseInt(row.value);  // ints are easier
            return row.value;
          });
          appliedFilters[field] = payload;
        } else if (payload.value && payload.value.value) { // payload value is an object with a value attribute
          if (!isNaN(payload.value.value)) payload.value.value =  parseInt(payload.value.value);  // ints are easier
          payload.value = [payload.value]
          appliedFilters[field] = payload;
        } else { // if there is no value, remove this filter from appliedFilters
          delete appliedFilters[field];
        }
        
        this.setState({appliedFilters: appliedFilters});
        break;

      case 'CHECKBOX_CHANGE':
        break;
    } 
  }
  
  render() {
    let markup;
    let routeParams = pick(this.props, ['history', 'location', 'params', 'route', 'routeParams', 'routes']);
    console.log('DASH RENDER', this);
    return (
        <div className="container">
          <link rel="stylesheet" type="text/css" href={this.props.faPath} />
          <h1 className="dashboard-title">{this.props.title}</h1>
          {this.props.regions.map( (region, key) => {
            
            if (region.multi) {
              let multiRegionKey = this.getChildData(region);
              region.children = region.elements[multiRegionKey];
            }

            return (
              <div id={region.id} className={region.className} >
                {region.children.map( (element, key) => {
                  let props = Object.assign(element, {globalData: this.state.data, appliedFilters: this.state.appliedFilters, vars: this.props.vars}, routeParams);
                  props.data = this.getChildData(element);
                  let output;
                  
                  if (props.cardStyle) {
                    output = 
                      <Card key={key} {...element}>
                        {React.createElement(Registry.get(element.type), props)}
                      </Card>
                  } else {
                    output = 
                      React.createElement(Registry.get(element.type), props)
                  }

                  return output;
                })}  
              </div>
            )
          })}
        </div>
    );
  }
}
