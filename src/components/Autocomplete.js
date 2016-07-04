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
import Registry from '../utils/Registry';
import {makeKey} from '../utils/utils';
import BaseComponent from './BaseComponent';
import DashboardConstants from '../constants/DashboardConstants';

export default class Autocomplete extends BaseComponent {
  onChange(value) {
    // The default behavior for us is change the value
    // of the input to reflect current selections
    this.setState({
      value: value
    });

    this.emit({
      actionType: DashboardConstants.AUTOCOMPLETE_CHANGE,
      value: value,
      id: this.props.id || makeKey(5)
    });
  }

  render(){
    return (
      <Select.Async value={this.state.value} loadOptions={this.getOptions.bind(this)} {...this.props} onChange={this.onChange.bind(this)}/>
    );
  }
}

Registry.set('Autocomplete', Autocomplete);
