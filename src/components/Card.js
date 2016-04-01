import React, { Component } from 'react';
import Registry from '../utils/Registry';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import BaseComponent from './BaseComponent';

export default class Card extends BaseComponent {
  render() {
    let card = pick(this.props, 'card').card;
    let props = omit(this.props, 'card');
    let header, footer;

    if(this.props.header) {
      header = (
        <div className="card-header">
          <span className={this.props.iconClass} aria-hidden="true"></span>
          <span className="card-header-content">{props.header}</span>
        </div>
      );
    }

    if(this.props.footer) {
      footer = <div className="card-footer">{props.footer}</div>;
    }

    return (
      <div className={'card-' + props.cardStyle} {...card}>
        {header}
        <div className="card-content">
          {props.children}
        </div>
        {footer}
      </div>
    )
  }
}