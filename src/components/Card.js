import React, { Component } from 'react';
import Registry from '../utils/Registry';

const CARD_REGIONS = [
  'header', 'subheader', 'topmatter',
  'subheader2', 'topmatter2', 'footer',
  'footerHeader', 'footerSubheader', 'bottommatter',
  'footerSubheader2', 'bottommatter2'
];

export default class Card extends Component {
  render() {
    let props = this.props;
    let style = props.style || {};
    let regions = {};
    let classNames = (props.cardClasses || []).join(' ') || '';
    let classInnerNames = (props.cardInnerClasses || []).join(' ') || '';

    CARD_REGIONS.forEach(region => {
      if (props[region]) {
        let icon = region === 'header' && props.iconClass ? <span className={`fa ${props.iconClass}`}></span> : false;
        regions[region] = (
          <div className={"card-" + region}>
            <div className={"card-" + region + "-inner"}>{icon}{props[region]}</div>
          </div>
        )
      }
    });

    return (
      <div className={'card card-' + props.cardStyle + ' ' + classNames} style={style}>
        <div className={ 'card-inner ' + classInnerNames }>
          <div className="card-top">
            {regions.header}
            {regions.subheader}
            {regions.topmatter}
            {regions.subheader2}
            {regions.topmatter2}
          </div>
          <div className="card-content">
            {props.children}
          </div>
          <div className="card-bottom">
            {regions.footerHeader}
            {regions.footerSubheader}
            {regions.bottommatter}
            {regions.footerSubheader2}
            {regions.bottommatter2}
          </div>
        </div>
      </div>
    )
  }
}

Registry.set('Card', Card);
