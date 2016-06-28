import Registry from './Registry';
import {flow, isFunction, isString, omit} from 'lodash';

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
      let funcHandler = DataHandler.get(handler.name);
      let args = omit(handler,'name');
      return funcHandler.bind(this, componentData, dashboardData, args);
    });

    let handle = flow(handlers);
    return (isFunction(handle)) ? handle(componentData, dashboardData) : componentData;
  }
}
