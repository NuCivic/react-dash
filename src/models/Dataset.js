import MemoryStore from './MemoryStore';
import CSV from 'csv-es6-data-backend';
import DKAN from 'dkan-es6-data-backend';
import { Cartodb } from 'cartodb-es6-data-backend';
import {omit, uniq} from 'lodash';

export default class Dataset {

  static registerBackend(name, klass) {
    Dataset.backends = Dataset.backends || Object.create(null);
    Dataset.backends[name] = klass;
  }

  static getBackendFromName(name) {
    return Dataset.backends[name];
  }

  constructor(settings) {
    this.settings = settings;
    this.backend = Dataset.getBackendFromName(settings.backend);
    this._store = this.backend;
    this.queryState = Object.assign({}, settings.queryObj);
  }

  fetch() {
    return this.backend
      .fetch(omit(this.settings, 'backend'))
      .then(this.onFetch.bind(this));
  }

  onFetch(result) {
    console.log("ON FETCH", result);
    this.fields = this._normalizeFields(result.fields);
    if (result.useMemoryStore) {
      this._store = new MemoryStore(result.records, this.fields);
      this._store
        .query(this.queryState, omit(this.settings, 'backend'))
        .then(this.onResults.bind(this));
    }
    else {
      this.onResults(result);
      return(result);
    }
  }

  query(queryObj) {
    return new Promise((resolve, reject) => {
      this._store
      .query(queryObj, this.settings)
      .then((data) => {
        console.log('QUERIED', data);
        this.onResults(data);
        resolve(data);
      });
    });
  }

  onResults(queryResult) {
    console.log("ON RESULT", queryResult);
    this.recordCount = queryResult.total;
    this.records = queryResult.rows;
  }

  _normalizeFields(fields) {
    return uniq(fields || []).map( field => ({id: field}));
  }
}

Dataset.registerBackend('csv', CSV);
Dataset.registerBackend('dkan', DKAN);
Dataset.registerBackend('cartodb', Cartodb);
