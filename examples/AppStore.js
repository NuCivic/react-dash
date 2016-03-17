import EventDispatcher from '../src/EventDispatcher';
import EventEmitter from 'events';
import DashboardStore from '../src/DashboardStore';
import DashboardConstants from '../src/constants';
import {initialState} from './initialState';
import {datum} from './datum';

class AppStore extends DashboardStore {
  fetchData(action) {
    fetch('http://demo.getdkan.com/node/9/download').then((response) => {
      this.state.data = {my:'newData'};
      this.emit(DashboardConstants.STORE_CHANGE);
    });
  }
  getRandomMetric(action) {
    let componentState = this.getComponentById(action.id);
    componentState.metric = Math.floor(Math.random() * 1000);
    this.emit(DashboardConstants.STORE_CHANGE);
  }

  getTableData(action) {
    let componentState = this.getComponentById(action.id);
    componentState.data = [
      {
        a1: 'a2',
        b1: 'b2',
        c1: 'c2',
      },
      {
        a1: 'a3',
        b1: 'b3',
        c1: 'c3',
      }
    ];
    this.emit(DashboardConstants.STORE_CHANGE);
  }

  getData(action) {
    let element = this.getComponentById(action.id);
    element.data = datum;
    this.emit(DashboardConstants.STORE_CHANGE);
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