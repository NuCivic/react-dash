import { flow, isFunction, isString, omit } from 'lodash';
import Registry from './Registry';

export default class DataHandler {
  /**
   * Register a new data handler using the registry.
   */
  static set(path, handler) {
    Registry.set(`dataHandlers.${path}`, handler);
  }

  static setLib(libName, handlers) {
    for (const k in handlers) {
      Registry.set(['dataHandlers', libName, k], handlers[k]);
    }
  }

  /**
   * Retrieves a data handler given an object path.
   */
  static get(path) {
    return Registry.get(`dataHandlers.${path}`);
  }

  /**
   * Call all the data handlers
   *
   * @@TODO - we should catch failures here and
   * @@TODO - provide meaningful error messages
   */
  static handle(hs, componentData, dashboardData, e, appliedFilters) {
    let handler;
    let funcHandler;
    let args;

    try {
      const handle = flow(
        (hs || []).map((h) => {
          handler = isString(h) ? { name: h } : h;
          funcHandler = DataHandler.get(handler.name);
          args = omit(handler, 'name');
          return funcHandler.bind(this, componentData, dashboardData, args, e, appliedFilters);
        }),
      );
      return (isFunction(handle)) ? handle(componentData, dashboardData) : componentData;
    } catch (err) {
      console.error(`Error in data handler ${handler.name}. This could mean that one of your data handlers is missing from the registry. Here are the handlers we're trying to process:`, handler, args, err);
    }
  }
}
