import {property} from 'lodash';
import d3 from 'd3';

export function getProp(key, object) {
  return Object.assign({}, property(key)(object))
}

export function makeKey(len)
{
	  let length = len || 5;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export function formatDate(date, format) {
  const formatter = d3.time.format(format);
  return formatter(date);
}

export function formatNumber(n, format) {
  const formatter = d3.format(format);
  return formatter(n);
}