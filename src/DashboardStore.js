import EventDispatcher from './EventDispatcher';
import EventEmitter from 'events';

export default class DashboardStore  extends EventEmitter {

  constructor(initialState) {
    super(initialState);
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  addChangeListener(event, callback) {
    this.on(event, callback);
  }

  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  }

  getComponentById(id) {
    let elementProps;
    Object.keys(this.state.regions).forEach((regionName) => {
      this.state.regions[regionName].forEach((element) => {
        if(element.id === id) {
          elementProps = element;
        }
      })
    });
    return elementProps;
  }

  execute(action){
    let executable = action.reference;
    if(!executable.name) throw Error(`Missing executable name`);
    if(!(executable.name in this)) throw Error(`Method ${executable.name} were not found in the current context.`);
    this[executable.name](action);
  }
}
