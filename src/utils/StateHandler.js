import Registry from './Registry';
import {isFunction, isString, omit} from 'lodash';

/**
 * The State Handler implementation is an implementation of the Registry
 * It allows us to store a library of functions which can be used to 
 * update the state of components extending BaseComponent using domain 
 * specific logic which we can store with our dashboard implementations
 *
 * NOTE that this is very similar to the DataHandler implementation
 */
export default class StateHandler {

  /**
   * Register a new state handler using the registry.
   */
  static set(path, handler) {
    Registry.set('stateHandlers.' + path, handler);
  }

  static setLib(libName, handlers) {
    for (let k in handlers) {
      Registry.set(['stateHandlers', libName, k], handlers[k]);
    } 
  }

  /**
   * Retrieves a state handler given an object path.
   */
  static get(path) {
    return Registry.get('stateHandlers.' + path);
  }

  /**
   * Call all the state handlers
   * @returns { obj } a map of attributes keyed to the values returned by the handlers
   *
   * for example:
   *
   * {
   *   flagColors: ['red', 'white', 'blue'],
   *   noStates: 50
   * }
   *
   * This object can then be set to the component state.
   */
  static handle(hs, componentData, dashboardData, e, appliedFilters) {
    let cur;
    let newState = {};

    try {
      let handlers = (hs || []);
      handlers.forEach(h => {
        let handler = isString(h) ? { name: h } : h ;
        let funcHandler = StateHandler.get(handler.name);
        let args = omit(handler,'name');
        cur = h;
        newState[h.attr] = funcHandler.call(this, componentData, dashboardData, args, e, appliedFilters);
      });
    } catch (e) {
      console.error("Error in state handler. This could mean that one of your state handlers is missing from the registry. Here are the handlers we're trying to process:", e, cur, arguments);
    }
    
    console.log('newState', newState);
    return newState;
  }
}
