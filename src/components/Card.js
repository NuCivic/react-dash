import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import {omit, pick} from 'lodash';

export default class Card extends Component {
  render() {
    let props = this.props;
    let header, footer;
    let style = props.style || {};
    let classNames = (props.cardClasses || []).join(' ') || '';

    if(props.header) {
      header = (
        <div className="card-header">
          <span className={'card-header-icon ' + props.iconClass} aria-hidden="true"></span>
          <span className='card-header-content'>{props.header}</span>
        </div>
      );
    }

    if(props.footer) {
      footer = <div className="card-footer">{props.footer}</div>;
    }

    return (
      <div className={'card card-' + props.cardStyle + ' ' + classNames} style={style}>
        {header}
        <div className="card-content">
          {props.children}
        </div>
        {footer}
      </div>
    )
  }
}
