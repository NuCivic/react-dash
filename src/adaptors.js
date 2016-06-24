/**
 * ADAPTOR CLASS
 * 
 * Provides a function which will format data from the standard format
 * returned by our backends. It applies transformations to data. The transformed data
 * can then be passed to a third party library (for example NVD3, PLOTLY, etc) for 
 * rendering.
 *
 * By maintaining the adaptors class, we can keep our glue code isolated, and avoid repetition
 * of tedious transformations
 */
export default class Adaptor {
  /**
   * @param opts.lib - the library (eg - nvd3)
   * @param opts.func - the function name (eg pieChart)
   */
  lookup (opts) {
    console.log(opts, _lookup['nvd3']);
    const def = _lookup[opts.lib][opts.type];
    const func = _funcs[opts.lib][def];
    console.log(def,func);
    if (func && typeof func === 'function') {
      return func;
    } else {
      console.warn('WARNING: Adaptor library not found', opts);
      return false;
    }
  }
}

/**
 * PRIVATES 
 * */
/* Figure out which function we need to return */
const _lookup = {
  nvd3: {
    lineChart: 'base',
    linePlusBarChart: 'base',
    discreteBarChart: 'base',
    pieChart: 'pieChart',
  }    
}

/* A hash of functions */
const _funcs = {
  nvd3: {
    base: function (data) {
      return [{
        values: data  
      }];
    },
    pieChart: function (data) {
      return data;
    }
  }
}
