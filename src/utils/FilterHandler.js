import Registry from './Registry';
import {flow, isFunction, isString, omit} from 'lodash';

export default class FilterHandler {

  /**
   * Register a new state handler using the registry.
   */
  static set(path, handler) {
    Registry.set('filterHandlers.' + path, handler);
  }

  static setLib(libName, handlers) {
    for (let k in handlers) {
      Registry.set(['filterHandlers', libName, k], handlers[k]);
    }
  }

  /**
   * Retrieves a state handler given an object path.
   */
  static get(path) {
    return Registry.get('filterHandlers.' + path);
  }

  static handle(hs, payload, state) {
    let args;
    let handler
    const componentData = payload.data;
    const dashboardData = payload.globalData;
    try {
      let handlers = (hs || []);
      handlers.forEach(h => {
        handler = Object.values(h)[0];
        const field = Object.keys(h)[0];
        if (field in payload.appliedFilters) {
          let funcHandler = FilterHandler.get(handler);
          const filter = payload.appliedFilters[field];
          let newVal = funcHandler.call(this, componentData, dashboardData, args, filter, state, payload);
          payload.appliedFilters[field].value = newVal;
        }
      });
    } catch (err) {
      console.error(`Error in filter handler ${handler}. This could mean that one of your filter handlers is missing from the registry. Here are the handlers we're trying to process:`, handler, args, err);
    }
    return payload;
  }
}
