import AppDispatcher from '../src/AppDispatcher';
import EventEmitter from 'events';
import Store from '../src/Store';
import DashboardConstants from '../src/constants';
import {initialState} from './initialState';

class DashboardStore extends Store {
  fetchData(action) {
    fetch('http://demo.getdkan.com/node/9/download').then((response) => {
      this.state.data = {my:'newData'};
      this.emit(DashboardConstants.DATA_LOADED);
    });
  }
}

let dashboardStore = new DashboardStore(initialState);
AppDispatcher.register((payload) => {
  switch(payload.action.actionType) {
    case DashboardConstants.AUTOCOMPLETE_CHANGE:
      dashboardStore.fetchData(payload.action);
      break;
  }
});

export default dashboardStore;