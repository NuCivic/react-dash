import Registry from './Registry';
import {flowRight, isFunction, isString} from 'lodash';

export default class DataHandler {

  /**
   * Register a new data handler using the registry.
   */
  static set(path, handler) {
    Registry.set('dataHandlers.' + path, handler);
  }

  /**
   * Retrieves a data handler given an object path.
   */
  static get(path) {
    return Registry.get('dataHandlers.' + path);
  }

  /**
   * Call all the data handlers.
   */
  static handle(hs, componentData, dashboardData) {
    let handlers = (hs || []).map((h) => {
      let handler = isString(h) ? { name: h } : h ;
      return DataHandler
        .get(handler.name)
        .bind(handler, componentData, dashboardData);
    });
    let handle = flowRight(handlers);
    return (isFunction(handle)) ? handle(componentData, dashboardData) : componentData;
  }
}