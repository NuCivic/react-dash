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

  componentDidMount() {
    super.componentDidMount();
    if(!this.props.appliedFilters[this.props.field] && this.props.initVal) {
      this.onFilter(this.props.initVal);
      let filter = Object.assign({}, this.props);
      filter.value = this.props.initVal;
      filter.actionType = 'AUTOCOMPLETE_CHANGE';
      setTimeout(() => this.emit(filter), 0);
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
    props.options = this.props.data[0];
    props.isLoading = this.state.isFetching;

    if (val && !props.multi) val = val[0];

    return (
      <div className={cx('autocomplete-filter-container', className)}>
        <label htmlFor={this.state.key} className={labelClass}>Filter Label</label>
        <ReactSelect value={val} disabled={this.isDisabled()} {...props} onChange={this.onChange.bind(this)} key={this.state.key} inputProps={inputProps} />
      </div>
    );
  }
}

Registry.set('Autocomplete', Autocomplete);
