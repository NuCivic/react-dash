import Registry from './Registry';
import {flow, isFunction, isString, omit} from 'lodash';

export default class DataHandler {

  /**
   * Register a new data handler using the registry.
   */
  static set(path, handler) {
    Registry.set('dataHandlers.' + path, handler);
  }

  static setLib(libName, handlers) {
    for (let k in handlers) {
      Registry.set(['dataHandlers', libName, k], handlers[k]);
    } 
  }

  /**
   * Retrieves a data handler given an object path.
   */
  static get(path) {
    return Registry.get('dataHandlers.' + path);
  }

  /**
   * Call all the data handlers
   *
   * @@TODO - we should catch failures here and
   * @@TODO - provide meaningful error messages
   */
  static handle(hs, componentData, dashboardData, e, appliedFilters) {
    let cur;
    try {
      let handlers = (hs || []).map((h) => {
        let handler = isString(h) ? { name: h } : h ;
        let funcHandler = DataHandler.get(handler.name);
        let args = omit(handler,'name');
        cur = h;
        return funcHandler.bind(this, componentData, dashboardData, args, e, appliedFilters);
      });
      let handle = flow(handlers);
      return (isFunction(handle)) ? handle(componentData, dashboardData) : componentData;
    } catch (e) {
      console.error("Error in data handler. This could mean that one of your data handlers is missing from the registry. Here are the handlers we're trying to process:", e, cur, arguments);
    }
  }
}
