import {merge} from 'lodash'
import { push } from 'react-router-redux';
/****
 * Reducers
 ****/
export function filterParams(state = {}, action) {
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

// Serialize params object as query string
function qFromParams(params) {
  var str = [];
  for (var p in params) {
    for (var q in params[p]) {
      console.log(".>>.", p,q, params[p][q], `${p}_${q}=${params[p][q]}`);
      str.push(`${p}_${q}=${params[p][q]}`);
    }
  }
  return '?'+str.join('&');
}

// De-serialize query str to params object
// from http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
function paramsFromQ(str) {
  return JSON.parse('{"' + decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
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
