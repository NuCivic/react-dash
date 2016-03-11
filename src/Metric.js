import React, { Component } from 'react';
import Registry from './Registry';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

export default class Metric extends Component {
  render() {

    return (
      <div class="row">
        <div className="col-md-4">
          <div className="icon-container"></div>
        </div>
        <div className="col-md-8">

        </div>
      </div>
    )
  }
}

Registry.set('Metric', Metric);