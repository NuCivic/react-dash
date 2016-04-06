import {property} from 'lodash';

export function getProp(key, object) {
  return Object.assign({}, property(key)(object))
}