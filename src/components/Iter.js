import React from 'react';
import Registry from '../utils/Registry';
import Card from '../components/Card';
import BaseComponent from '../components/BaseComponent';
import {makeKey} from '../utils/utils';

export default class Iter extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let cardVars = this.getCardVariables();
    let rows = this.state.rows || this.props.rows;
    let els = rows.map( (row, i) => {
      let props = Object.assign({}, this.props, row);
      props.key = i;
      return React.createElement(Registry.get(this.props.elType), props);
    })

    return (
      <Card className={this.props.className} {...cardVars}>
       {els}
      </Card>
    )
  }
}

Registry.set('Iter', Iter);
