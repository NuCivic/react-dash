import AppDispatcher from './AppDispatcher';
import EventEmitter from 'events';


export default class Store extends EventEmitter {
  constructor(initialState) {
    super(initialState);
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  updateData(data) {
    this.state.data = data;
  }

  addChangeListener(event, callback) {
    this.on(event, callback);
  }

  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  }

  updateComponentData(action){
    // Find the element to update the data
  }

}

