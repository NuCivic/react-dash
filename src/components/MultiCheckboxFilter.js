import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseFilter from './BaseFilter';
import CheckboxFilter from '../ReactDashboard';
import { makeKey } from '../utils/utils';

export default class MultiCheckboxFilter extends BaseFilter {
  constructor(props) {
    super(props);
    this.state.actionType = "MULTICHECKBOX_CHANGE";
    this.state.elKey = makeKey();
  }

  checkboxClick(e) {
    console.log('CLICK', e , this);
  }

  render(){
      let val = this.getFilterValue();
      
      return (
        <ul>
          { this.props.options.map(el => {
            el.checked = false;
            return (
              // figure out if it's checked
							 <li className='react-dash-checkbox'>
									<input
										type="checkbox"
										name={this.props.name}
                    value={el.value}
                    checked={el.checked}
										disabled={this.isDisabled()}
										onClick={this.checkboxClick.bind(this)}
									/>
									<label htmlFor={this.props.name} value={el.label}>
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
