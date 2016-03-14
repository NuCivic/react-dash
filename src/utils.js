import property from 'lodash/property';

export function bindListeners(props) {
  // Replace serialized functions with real functions
  return Object.keys(props).reduce((acum, key) => {
    let value = props[key];
    if(value.type === 'listener') {
      acum[key] = props.context[value.name];
    } else {
      acum[key] = value;
    }
    return acum;
  }, {});
}

export function getProp(key, object) {
  return Object.assign({}, property(key)(object))
}