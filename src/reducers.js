import {merge} from 'lodash'
import {qFromParams} from './utils/utils';
/****
 * Reducers
 ****/
 // @@TODO
export function urlState(state = {}, action) {
  console.log('urlState', state, action);
  if (action.type === 'update_filter') {
    let newFilters = {};
    newFilters[action.el] = newFilters[action.el] || {};
    newFilters[action.el][action.filterId] = action.vals;
    const curFilters = merge({}, state, newFilters);
    const newState = Object.assign(curFilters, {filtersQuery: qFromParams(curFilters)});
    return newState;;
  } else {
    return state;
  }
}
