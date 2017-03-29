import React, { Component } from 'react';
import Registry from '../utils/Registry';
import {makeKey} from '../utils/utils';

export default class Iter extends Component {
  render() {
    let els = this.props.rows.map( row => {
      let props = Object.assign({}, this.props, row);
      props.key = makeKey();
      return React.createElement(Registry.get(this.props.elType), props);
    })

      return (
        <div className={this.props.className}>
         {els}
        </div>
      )
  }
}

Registry.set('Iter', Iter);
