import { Dispatcher } from 'flux';

class DispatcherClass extends Dispatcher {

  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action,
    });
  }
}

const EventDispatcher = new DispatcherClass();

export default EventDispatcher;