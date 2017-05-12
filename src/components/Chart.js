import React, { Component } from 'react';
import Registry from '../utils/Registry';
import NVD3Chart from 'react-nvd3';
import BaseComponent from './BaseComponent';
import Card from './Card';
import Loader from './Loader';
import Filter from './Filter';
import { makeKey } from '../utils/utils';
import { isFunction, map, uniq, pick, values, flatten} from 'lodash';
import { format } from 'd3';

export default class Chart extends BaseComponent {
  constructor (props) {
    super(props);

    if (!this.state.key) {
      this.state.key = makeKey();
    }
  }

  // given a d3 format specifier, return a d3 formatting
  // function for use by react-nvd3 component
  getFormatter(specifier, time=false) {
    if (typeof specifier === 'string') {
      return format(specifier);
    }
    if (isFunction(specifier)) {
      return specifier;
    }
  }

  getFormattedSettings() {
    let _settings = Object.assign({}, this.props.settings);

    // Allow use object for colors to keep order after filter changes.
    if(_settings.color && !Array.isArray(_settings.color)) {
      let labels;
      if(this.props.data.length && this.props.data[0].values) {
        labels = map(flatten(map(this.props.data, 'values')), _settings.x);
      } else {
        labels = uniq(map(this.props.data, _settings.x));
      }
      _settings.color = values(pick(_settings.color, labels));
    }

    Object.keys(_settings).forEach(k => {
      if (_settings[k].tickFormat) {
        _settings[k].tickFormat = this.getFormatter(_settings[k].tickFormat);
      }
    });

    return _settings;
  }

  // doc-block-start
  render() {
    let props = Object.assign({}, this.props);
    let settings = Object.assign({datum: this.props.data, key: this.state.key}, this.getFormattedSettings());

    // Add card regions from state if available
    props.header = this.state.header || props.header;
    props.footer = this.state.footer || props.footer;

    return (
      <Card key={'card_'+this.state.key} {...this.state.cardVariables}>
        <NVD3Chart {...settings} />
      </Card>
     )
  }
  // doc-block-end
}

Registry.set('Chart', Chart);
