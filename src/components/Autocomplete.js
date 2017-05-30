import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseFilter from './BaseFilter';
import ReactSelect from './ReactSelect';
import { makeKey } from '../utils/utils';
import { omit } from 'lodash';
import cx from 'classnames/bind';

export default class Autocomplete extends BaseFilter {
  constructor(props) {
    super(props);
    this.state.actionType = "AUTOCOMPLETE_CHANGE";
    if (!this.state.key) {
      this.state.key = makeKey();
    }
  }

  render(){
    let val = this.getFilterValue();
    let props = omit(this.props, 'className');
    let label = props.label || 'Filter Label';
    let labelClass = (props.label) ? '' : 'sr-only';
    let { className } = this.props;
    let inputProps = {};

    inputProps.id = this.state.key;

    if (val && !props.multi) val = val[0];

    return (
      <div className={cx('autocomplete-filter-container', className)}>
        <label htmlFor={this.state.key} className={labelClass}>Filter Label</label>
        <ReactSelect.Async value={val} loadOptions={this.loadOptions.bind(this)} disabled={this.isDisabled()} {...props} onChange={this.onChange.bind(this)} key={this.state.key} inputProps={inputProps} />
      </div>
    );
  }
}

Registry.set('Autocomplete', Autocomplete);
