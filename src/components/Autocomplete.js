import React from 'react';
import { omit } from 'lodash';
import cx from 'classnames/bind';
import Registry from '../utils/Registry';
import BaseFilter from './BaseFilter';
import ReactSelect from './ReactSelect';
import { makeKey } from '../utils/utils';

export default class Autocomplete extends BaseFilter {
  constructor(props) {
    super(props);
    this.state.actionType = 'AUTOCOMPLETE_CHANGE';
    if (!this.state.key) {
      this.state.key = makeKey();
    }
  }

  render() {
    const props = omit(this.props, 'className');
    const label = props.label || 'Filter Label';
    const labelClass = (props.label) ? '' : 'sr-only';
    const { className } = this.props;
    const inputProps = {};
    let val = this.getFilterValue();

    inputProps.id = this.state.key;
    props.options = this.props.data[0];
    props.isLoading = this.state.isFetching;

    if (val && !props.multi) val = val[0];

    return (
      <div className={cx('autocomplete-filter-container', className)}>
        <label htmlFor={this.state.key} className={labelClass}>Filter Label</label>
        <ReactSelect
          value={val}
          disabled={this.isDisabled()}
          {...props}
          onChange={this.onChange.bind(this)}
          key={this.state.key}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

Registry.set('Autocomplete', Autocomplete);
