import property from 'lodash/property';

export function getProp(key, object) {
  return Object.assign({}, property(key)(object))
}