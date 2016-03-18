import EventDispatcher from '../src/EventDispatcher';
import EventEmitter from 'events';
import DashboardStore from '../src/stores/DashboardStore';
import DashboardConstants from '../src/constants';
import {initialState} from './initialState';
import {datum} from './datum';
import Immutable from 'immutable';
class AppStore extends DashboardStore {

  fetchData(action) {
    fetch('http://demo.getdkan.com/node/9/download').then((response) => {
      this.state.data = { my:'newData'};
      this.emit(DashboardConstants.STORE_CHANGE);
    });
  }

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

let appStore = new AppStore(initialState);

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