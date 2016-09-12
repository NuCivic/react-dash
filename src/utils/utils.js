import {property, isEmpty} from 'lodash';
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
 * @param query {object} the query object from react-router location.query, for example g1=key1_val1&g1=key1_val2&g1=key2_val3&g2=key3_val
 * @param cid {string} unique component ID, g1 in the above example
 * @returns {object} the sub-query as an object:
 * {
 *   key1: ['val1', 'val2'],
 *   key2: 'val3'
 * }
 */
export function getOwnQueryParams(query, cid) {
  let ownParams = {};
  Object.keys(query).forEach(key => {
    // check if the params belong to the component in question
    if (key === cid) {
      // component has multiple params
      if (typeof query[key] === 'object') {
        query[key].forEach(paramStr => {
          const pp = paramStr.split('__');
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
        const p = query[key].split('__');
        ownParams[p[0]] = p[1];
      }
    }
  })
  if (isEmpty(ownParams)) return;
  return ownParams;
}

export function getFID(val) {
  if (val.indexOf && val.indexOf('fid') >= 0) {
    return val.replace('fid', '');
  }
  return false;
} 

// from https://gist.github.com/dgs700/4677933
export function objToQueryString (a) {
        var prefix, s, add, name, r20, output;
        s = [];
        r20 = /%20/g;
        add = function (key, value) {
            // If value is a function, invoke it and return its value
            value = ( typeof value == 'function' ) ? value() : ( value == null ? "" : value );
            s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (a instanceof Array) {
            for (name in a) {
                add(name, a[name]);
            }
        } else {
            for (prefix in a) {
                buildParams(prefix, a[ prefix ], add);
            }
        }
        output = s.join("&").replace(r20, "+");
        return output;
    };
    function buildParams(prefix, obj, add) {
        var name, i, l, rbracket;
        rbracket = /\[\]$/;
        if (obj instanceof Array) {
            for (i = 0, l = obj.length; i < l; i++) {
                if (rbracket.test(prefix)) {
                    add(prefix, obj[i]);
                } else {
                    buildParams(prefix + "[" + ( typeof obj[i] === "object" ? i : "" ) + "]", obj[i], add);
                }
            }
        } else if (typeof obj == "object") {
            // Serialize object item.
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[ name ], add);
            }
        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
}

// we need to be able to rewrite the query with new params for a component
export function updadateComponentsQParams(query, cid, ownParams) {

}
