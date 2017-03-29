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
    let els = this.props.rows.map( row => {
      let props = Object.assign({}, this.props, row);
      props.key = makeKey();
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
