import React, { Component } from 'react';
import Registry from './Registry';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

export default class Card extends Component {
  render() {
    let card = pick(this.props, 'card').card;
    let props = omit(this.props, 'card');

    return (
      <div className={'card-' + props.cardStyle} {...card}>
        <div className="card-header">
          <span className={this.props.iconClass} aria-hidden="true"></span>
          <span className="card-header-content">{props.header}</span>
        </div>
        <div className="card-content">
          {props.children}
        </div>
        <div className="card-footer">{props.footer}</div>
      </div>
    )
  }
}

Registry.set('Card', Card);