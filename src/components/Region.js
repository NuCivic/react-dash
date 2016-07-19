import React, { Component } from 'react';
import Registry from '../utils/Registry';
import {getOwnQueryParams} from '../utils/utils';

export default class Region extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const location = this.props.location;
    return (
      <div className={this.props.className}>
        {this.props.children.map((element,key) => {
          return React.createElement(Registry.get(element.type), Object.assign({}, this.props.children[key], {ownParams: getOwnQueryParams(location.query, this.props.cid), location: location})
        )})}
      </div>
    );
  }
}

Registry.set('Region', Region);
