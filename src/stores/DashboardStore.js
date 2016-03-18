import EventDispatcher from '../EventDispatcher';
import EventEmitter from 'events';
import Immutable from 'immutable';
import DashboardConstants from '../constants';
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

  /**
   * Returns the path to the component state inside the store
   * @param  {String} id It's the component id added in the store
   * @return {Array}     A tuple of region and index of the component
   */
  getComponentPath(id) {
    let region;
    let index;
    Object.keys(this.state.regions).forEach((regionName) => {
      this.state.regions[regionName].forEach((element, i) => {
        if(element.id === id){
          region = regionName;
          index = i;
        }
      })
    });
    return [region, index];
  }

  /**
   * Allow to update a component without mutate the state
   */
  updateComponent(id, property, value, update = false) {
    let op = update ? 'updateIn' : 'setIn';
    let state = Immutable.fromJS(this.state);
    let path = this.getComponentPath(id);
    let newState = state[op](['regions'].concat(path, property), value);
    this.state = newState.toJS();
    this.emit(DashboardConstants.STORE_CHANGE);
  }

  /**
   * Action to execute arbitrary methods inside the store
   */
  execute(action){
    let executable = action.reference;
    if(!executable.name) throw Error(`Missing executable name`);
    if(!(executable.name in this)) throw Error(`Method ${executable.name} were not found in the current context.`);
    this[executable.name](action);
  }
}
