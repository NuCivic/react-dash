/**
 * This component is based in the react-select component https://github.com/JedWatson/react-select
 * It adds the ability to pass only the url from where options are get.
 * Url should have the following format: http://localhost:3004/options?q={{keyword}}
 * Keyword is the string to be sent to the server and retrive the available options
 * for that word.
 *
 * You can override all the available properties of the original component.
 * For more documentation about  this component please go
 * to https://github.com/JedWatson/react-select
 */

import React, { Component } from 'react';
import Select from 'react-select';
import Registry from '../Registry';
import {bindListeners, execute} from '../utils';
import EventDispatcher from '../EventDispatcher';

export default class Autocomplete extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange(value) {

    // The default behavior for us is change the value
    // of the input to reflect current selections
    this.setState({
      value: value
    });

    // This allow developers to set an onChange event to
    // change the state of the dashboard.
    if(this.props.onChange) {
      EventDispatcher.handleViewAction({actionType: 'AUTOCOMPLETE_CHANGE', value: value});
    }
  }

  /**
   * Load autocomplete options
   * @param  {String}   input A text with the query to be sent to the server
   * @param  {Function} cb    Callback to be called right after server response
   * @return {Promise}        A promise with the request
   */
  loadOptions(input, cb){
    let re = /\{\{(.+)\}\}/;
    if(!this.props.url) cb(new Error("A url should be provided"), null);
    return fetch(this.props.url.replace(re, input))
      .then((response) => {
        return response.json();
      }).then((json) => {
        return { options: json };
      });
  }

  render(){
    let props = bindListeners(this.props);
    return (
      <Select.Async value={this.state.value} loadOptions={this.loadOptions.bind(this)} {...props} onChange={this.onChange.bind(this)}/>
    );
  }
}

Registry.set('Autocomplete', Autocomplete);
