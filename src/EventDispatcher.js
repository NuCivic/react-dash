import { Dispatcher } from 'flux';

class DispatcherClass extends Dispatcher {

  handleViewAction(action) {
    setTimeout( () => {
      this.dispatch({
        source: 'VIEW_ACTION',
        action: action,
      });
    }, 0);
  }
}

const EventDispatcher = new DispatcherClass();

export default EventDispatcher;