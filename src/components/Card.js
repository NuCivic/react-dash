import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import {omit, pick} from 'lodash';

export default class Card extends Component {
  render() {
    let card = pick(this.props, 'card').card;
    let props = omit(this.props, 'card');
    let header, footer;
    let className = this.props.className || '';

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
      <div className={'card-' + props.cardStyle + ' ' + className} {...card}>
        {header}
        <div className="card-content">
          {props.children}
        </div>
        {footer}
      </div>
    )
  }
}
