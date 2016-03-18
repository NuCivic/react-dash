import EventDispatcher from '../src/EventDispatcher';
import EventEmitter from 'events';
import DashboardStore from '../src/stores/DashboardStore';
import DashboardConstants from '../src/constants';
import {initialState} from './initialState';
import {datum} from './datum';
import Immutable from 'immutable';

class AppStore extends DashboardStore {

  // This is an example about how to perfor async operations
  // like fetch the data and pass that data to the dashboard.
  // Here we are changing the state and triggering an event
  // change to notify all views should be re-rendered.
  fetchData(action) {
    fetch('http://demo.getdkan.com/node/9/download').then((response) => {

      // Since data is not part of an specific component in the dashboard
      // then we don't need to call update component. However we still need
      // to emit the store change event.
      this.state.data = { my:'newData'};
      this.emit(DashboardConstants.STORE_CHANGE);
    });
  }

  // This is an example of a synchronous operation.
  // We are creating some random metric and then updating
  // the component with the id = id at the key metric with
  // the value metric. This trigger the STORE_CHANGE event
  // internally then we don't need to execute that by hand.
  getRandomMetric(action) {
    let metric = Math.floor(Math.random() * 1000);
    this.updateComponent(action.id, 'metric', metric);
  }

  getTableData(action) {
    let data = [
      { a1: 'a2', b1: 'b2', c1: 'c2' },
      { a1: 'a3', b1: 'b3', c1: 'c3' }
    ];
    this.updateComponent(action.id, 'data', data);
  }

  getData(action) {
    this.updateComponent(action.id, 'data', datum);
  }
}

// Instantiate the store
let appStore = new AppStore(initialState);

// Every event triggered by the dispatcher will be
// handled by this arrow function. EventDispatcher is a
// singleton therefore it's the same instance across
// the application.
EventDispatcher.register((payload) => {
  switch(payload.action.actionType) {
    case DashboardConstants.AUTOCOMPLETE_CHANGE:
      appStore.fetchData(payload.action);
      break;
    case DashboardConstants.EXECUTE:
      appStore.execute(payload.action);
      break;
  }
});

export default appStore;