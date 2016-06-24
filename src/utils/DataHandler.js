import Registry from './Registry';

export default class DataHandler {

  static set(path, handler) {
    Registry.set('dataHandlers.' + path, handler);
  }

  static get(path) {
    return Registry.get('dataHandlers.' + path);
  }
}