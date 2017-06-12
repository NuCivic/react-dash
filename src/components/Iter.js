import React from 'react';
import Registry from '../utils/Registry';
import Card from '../components/Card';
import BaseComponent from '../components/BaseComponent';
import { makeKey } from '../utils/utils';

export default class Iter extends BaseComponent {
  render() {
    const cardVars = this.getCardVariables();
    const rows = this.state.rows || this.props.rows;
    const els = rows.map((row) => {
      const props = Object.assign({}, this.props, row);
      props.key = makeKey();
      return React.createElement(Registry.get(this.props.elType), props);
    });

    return (
      <Card className={this.props.className} {...cardVars}>
        {els}
      </Card>
    );
  }
}

Registry.set('Iter', Iter);
