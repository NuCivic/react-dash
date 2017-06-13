import React from 'react';
import Registry from '../utils/Registry';
import BaseFilter from './BaseFilter';
import { makeKey } from '../utils/utils';

export default class MultiCheckboxFilter extends BaseFilter {
  constructor(props) {
    super(props);
    this.state.actionType = 'AUTOCOMPLETE_CHANGE';
    this.state.key = this.state.key || makeKey();
    this.state.checked = this.state.checked || {};
  }

  checkboxClick(el) {
    const checked = Object.assign({}, this.state.checked);
    const filter = Object.assign({}, this.props);

    filter.actionType = this.state.actionType;

    if (checked[el.value] && checked[el.value] === true) {
      checked[el.value] = false;
    } else {
      checked[el.value] = true;
    }

    filter.value = Object.keys(checked)
      .map((k) => {
        if (checked[k]) {
          return k;
        }
        return undefined;
      })
      .filter(k => k !== undefined);

    this.setState({ checked });
    this.emit(filter);
  }

  render() {
    return (
      <ul className={`react-dash-checkbox ${this.props.className}`}>
        { this.props.options.map((el, idx) => {
          el.checked = this.state.checked[el.value];
          return (
            // figure out if it's checked
            <li className="react-dash-checkbox-item" key={idx + this.state.key}>
              <input
                type="checkbox"
                name={this.props.name}
                value={el.value}
                id={idx + this.state.key}
                checked={el.checked}
                onChange={() => this.checkboxClick(el)}
              />
              <label htmlFor={idx + this.state.key} value={el.label}>
                {el.label}
              </label>
            </li>
            );
        })
        }
      </ul>
    );
  }
}

Registry.set('MultiCheckboxFilter', MultiCheckboxFilter);
