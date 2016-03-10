// Pass config args and appData to cardDataHandlers
export function execute(executable, context){
  let fn = context[executable.name];
  return fn(executable.args);
}

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
