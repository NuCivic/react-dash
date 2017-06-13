import React from 'react';
import { isArray } from 'lodash';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import Card from './Card';

export default class Markup extends BaseComponent {
  getContent() {
    if (this.props.data && isArray(this.props.data) && this.props.data.length > 0) {
      return this.props.data[0];
    }

    if (this.props.data && !isArray(this.props.data)) {
      return this.props.data;
    }

    if (this.props.content) {
      return this.props.content;
    }

    return '';
  }

  render() {
    return (
      <Card {...this.state.cardVariables}>
        <div dangerouslySetInnerHTML={{ __html: this.getContent() }} />
      </Card>
    );
  }
}

Registry.set('Markup', Markup);
