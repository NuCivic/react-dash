import {property} from 'lodash';

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
