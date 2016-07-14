import {set} from 'lodash'
import { push } from 'react-router-redux';
/****
 * Reducers
 ****/
export function filterParams(state = {}, action) {
  if (action.type === 'update_filter') {
    let newFilters = set({}, [action.el, action.filterId]);
    newFilters[action.el][action.filterId] = action.vals;
    console.log('update_filter', newFilters);
    const curFilters = Object.assign({}, state, newFilters);
    console.log('qq/',qFromParams(curFilters));
    //push(qFromParams(curFilters));
    return curFilters;
  } else {
    return state;
  }
}

/*
 * Cheating
 * build url string for curFilters and push to url
 * @@TODO prob move this to Utils or something
 */
function qFromParams(curFilters) {
  var str = [];
  for (var p in curFilters) {
    for (var q in curFilters[p]) {
      console.log(".>>.", p,q, curFilters[p][q], `${p}_${q}=${curFilters[p][q]}`);
      str.push(`${p}_${q}=${curFilters[p][q]}`);
    }
  }
  return '?'+str.join('&');
}

function paramsFromQ(str) {
  // stub
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
