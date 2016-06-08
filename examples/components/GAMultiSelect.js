import React, { Component } from 'react';
import Registry from '../../src/utils/Registry';
import Multi from '../../src/components/Multi';

export default class GAMultiSelect extends Multi {
  /*
   * The render method, in this case, renders a select which triggers
   * our change listener.
   * A helper function renders an array of elements from the appropriate
   * section of the multi component's settings
   */
	render() {
		let v =
		<div className="multi-container">
			<select id="filter-select" style={{ marginBottom: '1em' }} onChange={this.multiComponentListener.bind(this)}>
				 <option value="a">Option A</option>
				 <option value="b">Option B</option>
			</select>
			<div className="multi-elements-container">
				{this.renderChildren()}
			</div>
		</div>
		return v;
	}

	/*
   * In this case we get the value from the select and use that as a key
   * to choose a part of the elements array, which we then set as the state
   * on our component
   */
	multiComponentListener(e) {
		this.setState({
			elements: this.props.elements[e.target.value]
		})
	}
}

Registry.set('GAMultiSelect', GAMultiSelect);
