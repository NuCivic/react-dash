import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Card, BaseComponent, Dataset, DataHandler, DataHandlers, Registry, EventDispatcher } from '../ReactDashboard';
import { isArray, isEqual, pick} from 'lodash';
import { appliedFiltersToQueryString } from '../utils/utils';

export default class Dashboard extends BaseComponent {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    super.componentWillMount();
    let appliedFilters = this.getUrlFilters();
    this.state.appliedFilters = appliedFilters;
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
  _applyDataHandlers(datahandlers, componentData=[]) {
    let _handlers = datahandlers;
    let _appliedFilters = this.state.appliedFilters || {};
    let _data = DataHandler.handle.call(this, _handlers, componentData, this.state.data, {e:'foo'}, _appliedFilters);
    return _data;
  }

  getUrlFilters() {
    console.log('gUrlF0');
    let q = this.props.location.query;
    let appliedFilters = {};
    
    console.log('getUrlF1', q);

    Object.keys(q).forEach(key => {
      let payload = {}; // mock url filter as regular Dashboard filter
      payload.field = key;
      payload.value = q[key].split(',');
      payload.vals = payload.value.map(v => {
        if (!isNaN(v)) return parseInt(v);
        return v;
      });
      appliedFilters = this.getUpdatedAppliedFilters(payload, appliedFilters);
    });
    
    console.log('getUrlF2', appliedFilters);

    return appliedFilters;
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
      data = this._applyDataHandlers(component.dataHandlers, component.data);
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
  getFilters(key, appliedFilters) {
    let filters = [];
    //let appliedFilters = Object.assign({}, this.state.appliedFilters);
    return Object.keys(appliedFilters).map(k => { 
      let next = appliedFilters[k];
      if (next && next.willFilter && next.willFilter.length > 0 ) {
        let will = next.willFilter.indexOf(key);
        if (will >= 0) return appliedFilters[k];
      }
    });
  }

  getFilterByField(field) {
    console.log('gFbF', field);
    let filter;

    this.props.regions.forEach(region => {
      if (region.children) {
        return region.children.forEach(child => {
          if (child.field === field) filter = child; 
        })
      } else if (region.elements) { // drill down through multi-component sections
        Object.keys(region.elements).forEach(k => {
          region.elements[k].forEach(el => {
            if (el.field === field) filter = el;
          });
        })
      }
    });

    return filter;
  }

  /**
   * Handle actions here.
   *    Update appliedFilters on state triggers re-render
   *    App parses appliedFilters and updates dash accordingly
   **/
  onAction(payload) {
    switch(payload.actionType) {
      case 'AUTOCOMPLETE_CHANGE':
        let appliedFilters = Object.assign({}, this.state.appliedFilters);
        let updatedAppliedFilters = this.getUpdatedAppliedFilters(payload, appliedFilters);
        let q = appliedFiltersToQueryString(updatedAppliedFilters);
        console.log('WW', window.location.pathName);
        browserHistory.push({ search: '?' + q });
        this.setState({appliedFilters: updatedAppliedFilters});
        break;
      
      default:
        console.warn('Actions should define an actionType. See docs @@LINK');
    } 
  }

  getUpdatedAppliedFilters(_payload, appliedFilters) {
    let field = _payload.field;
    let filter = this.getFilterByField(field);
    let payload = Object.assign(_payload, filter);


    // value is a non-empty array of values
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
    } else if (payload.value && typeof payload.value === 'string' || typeof payload.value === 'number') { // payload value is a scalar value
      payload.value = [payload.value];
      appliedFilters[field] = payload;
    } else { // if there is no value, remove this filter from appliedFilters
      delete appliedFilters[field];
    }
    return appliedFilters;
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
              region.key = key;
              region.children = region.elements[multiRegionKey];
            }

            return (
              <div id={region.id} className={region.className} >
                {region.children.map( (element, key) => {
                  let isReactEl = React.isValidElement(element);
                  let output;
                  let el;
                  // if it isn't a react element, the element is a settings object
                  let _props = (isReactEl) ? element.props : element;
                  let props = Object.assign({}, _props);
                  
                  props.data = this.getChildData(element) || [];
                  props.globalData = Object.assign({}, this.state.data || {});
                  props.appliedFilters = Object.assign({}, this.state.appliedFilters || {});
                  props.vars = Object.assign({}, this.props.vars || {});
                  props.routeParams = routeParams;
                  props.key = 'el_' + key;

                   el = (isReactEl) ? element : React.createElement(Registry.get(element.type), props);

                  if (props.cardStyle) {
                    output = 
                      <Card key={'card_'+key} {...props}>
                        {el}
                      </Card>
                  } else {
                    output = el;
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
