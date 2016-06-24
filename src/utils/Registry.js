import {set, get} from 'lodash';

export default class Registry {

  static set(path, obj) {
    Registry.root = Registry.root || Object.create(null);
    Registry.root = set(Registry.root, path, obj);
  }

  static get(path) {
    return get(Registry.root, path);
  }
}
