import {property} from 'lodash';
import d3 from 'd3';

export function getProp(key, object) {
  return Object.assign({}, property(key)(object))
}

export function makeKey(len=5)
{
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export function dateFormatter(format) {
  return function(date) {
    return formatDate(date, format);
  }
}

export function formatDate(date, format) {
  const d = (date instanceof Date) ? date : new Date(date);
  const formatter = d3.time.format(format);
  return formatter(d);
}

export function formatNumber(n, format) {
  const formatter = d3.format(format);
  return formatter(n);
}

// Serialize params object as query string
export function qFromParams(params) {
  var str = [];
  for (var p in params) {
    str.push(`${p}=${params[p]}`);
  }
  return '?'+str.join('&');
}

// De-serialize query str to params object
// from http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
export function paramsFromQ(str) {
  return JSON.parse('{"' + decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
}

/*
 * Return array of paramaters of format:
 * @param query {object} the query object from react-router location.query
 * @param cid {string} unique component ID
 * @returns {object} the sub-query containing query paramaters keyed to filter ID
 */
export function getOwnQueryParams(query, cid) {
  let own = {};
  Object.keys(query).map(key => {
    console.log(key, query[key], cid);
    // check if the params belong to the component in question
    if (key === cid) {
      let ownParams = {};
      // component has multiple params
      if (typeof query[key] === 'object') {
        query[key].forEach(paramStr => {
          const pp = paramStr.split('_');
          console.log('1', pp);
          // we already have an array for this key, add new val to arrya
          if (ownParams[pp[0]] && typeof ownParams[pp[0]] === 'object') {
            ownParams[pp[0]].push(pp[1]);
          // the key exists and is a string, convert val to array, add current val, and push new value
          } else if (ownParams[pp[0]] && typeof ownParams[pp[0]] === 'string') {
            let y = {}; // the new object to assign
            let z = []; // the array of vals
            z.push(ownParams[pp[0]]);
            z.push(pp[1]);
            y[pp[0]] = z;
            ownParams = Object.assign(ownParams, y);
          // or if the key is not in the params obj, just add it as a string
          } else {
            ownParams[pp[0]] = pp[1];
          }
        });
      } else {
        const p = query[key].split('_');
        ownParams[p[0]] = p[1];
      }
      console.log('siol',ownParams);
      return ownParams;
    }
  })


  let ownParams = Object.keys(query)
    .filter(k => {
      const param = k.split('_')[0];
      return (cid === param)
    })
    .map(key => {
     let fid = key.replace(cid + '_', '');
     return { fid: fid, value: query[key] }
    })
  return ownParams || {};
}
