import {merge} from 'lodash'
import {qFromParams} from './utils/utils';
/****
 * Reducers
 ****/
export function urlState(state = {}, action) {
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

// Return array of paramaters of format:
// [{fid: }]
// fid is filter id
/*export function getOwnQueryParams(state = {}, action) {
  let cid = this.state.cid;
  if (this.props.appFilterParams) {
    let ownParams = Object.keys(this.props.appFilterParams)
      .filter(k => { console.log(k);
        return (k.indexOf(cid) >= 0)
      })
      .map(key => {
       let fid = key.replace(cid + '_', '');
       return { fid: fid, value: this.props.appFilterParams[key] }
      })
    if (ownParams) console.log('OWN PARAMS', ownParams);
  }
  return {};
}
*/
