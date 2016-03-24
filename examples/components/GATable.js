import React, { Component } from 'react';
import Registry from '../../src/Registry';
import Table from '../../src/Table';

export default class GATable extends Table {

  getData() {
    return [
      { a1: 'a2', b1: 'b2', c1: 'c2' },
      { a1: 'a3', b1: 'b3', c1: 'c3'}
    ];
  }
}

Registry.set('GATable', GATable);
