import {property, isPlainObject} from 'lodash';
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


// from https://gist.github.com/dgs700/4677933
export function appliedFiltersToQueryString (appliedFilters) {
    let obj = getAppliedFilterValuesForUrl(appliedFilters);

    // We want to reduce the appliedFilters object to the simplest possible object which we can use for routing
    function getAppliedFilterValuesForUrl (appliedFilters) {
      let reduced = {};
      Object.keys(appliedFilters).forEach(key => {
        reduced[key] = appliedFilters[key].value.map(opt => {
            return isPlainObject(opt) ? opt.value : opt;
        });
      });

      return reduced;
    }

    return Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
}

export function getFID(val) {
  if (val.indexOf && val.indexOf('fid') >= 0) {
    return val.replace('fid', '');
  }
  return false;
}

