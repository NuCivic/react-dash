import {set, get} from 'lodash';

// Registry should return native react elements in addition to registered components
const reactEls = "a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr".split(' ');

export default class Registry {

  static set(path, obj) {
    Registry.root = Registry.root || Object.create(null);
    Registry.root = set(Registry.root, path, obj);
  }

  static get(path) {
    if (reactEls.indexOf(path.toLowerCase())  >= 0) {
      return path; 
    } else {
      return get(Registry.root, path);
    }
  }
}
