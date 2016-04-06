import {uniq, identity, isUndefined, every} from 'lodash';

export default class MemoryStore {
  constructor(records, fields) {
    this.records = records || [];
    if (fields) {
      this.fields = fields;
    } else {
      this.fields = (records[0] || []).map((value, key) => {
        return {id: key, type: 'string'};
      });
    }
  }

  query(queryObj = {}) {
    return new Promise((resolve, reject) => {
      let numRows = queryObj.size || this.records.length;
      let start = queryObj.from || 0;
      let results = this.records;
      results = this._applyFilters(results, queryObj);
      results = this._applyFreeTextQuery(results, queryObj);

      let out = {
        total: results.length,
        hits: results.slice(start, start + numRows),
      };
      resolve(out);
    });
  }

  // we OR across fields but AND across terms in query string
  _applyFreeTextQuery(results, queryObj) {
    if (queryObj.q) {
      var terms = queryObj.q.split(' ');
      var patterns = terms.map(term => {
        return new RegExp(term.toLowerCase());
      });
      results = results.filter(rawdoc => {
        var matches = true;
        patterns.forEach(pattern => {
          var foundmatch = false;
          this.fields.forEach(field => {
            var value = rawdoc[field.id];
            if ((value !== null) && (value !== undefined)) {
              value = value.toString();
            } else {
              // value can be null (apparently in some cases)
              value = '';
            }
            // TODO regexes?
            foundmatch = foundmatch || (pattern.test(value.toLowerCase()));
            // TODO: early out (once we are true should break to spare unnecessary testing)
            // if (foundmatch) return true;
          });
          matches = matches && foundmatch;
          // TODO: early out (once false should break to spare unnecessary testing)
          // if (!matches) return false;
        });
        return matches;
      });
    }
    return results;
  };

  _applyFilters(results, queryObj) {
    var filters = queryObj.filters || [];
    var filterFunctions = {
      term         : term,
      terms        : terms,
      range        : range
    };
    var dataParsers = {
      "integer"  : e => parseFloat(e, 10),
      "float"    : e => parseFloat(e, 10),
      "number"   : e => parseFloat(e, 10),
      "string"   : e => e.toString(),
      "date"     : e => Date.parse(e),
      "datetime" : e => (new Date(e)).valueOf()
    };

    var keyedFields = this.fields.reduce( (acum, field) => {
      acum[field.id] = field;
      return acum;
    }, {});

    function getDataParser(filter) {
      var fieldType = keyedFields[filter.field].type || 'string';
      return dataParsers[fieldType];
    }

    // filter records
    return results.filter(record => {
      var passes = filters.map( filter => {
        return filterFunctions[filter.type](record, filter);
      });

      // return only these records that pass every filters
      return every(passes, identity);
    });

    // filters definitions
    function term(record, filter) {
      let parse = getDataParser(filter);
      let value = parse(record[filter.field]);
      let term  = parse(filter.term);

      return (value === term);
    }

    function terms(record, filter) {
      let parse = getDataParser(filter);
      let value = parse(record[filter.field]);
      let terms  = parse(filter.terms).split(',');

      return (terms.indexOf(value) >= 0);
    }

    function range(record, filter) {
      let fromnull = (isUndefined(filter.from) || filter.from === null || filter.from === '');
      let tonull = (isUndefined(filter.to) || filter.to === null || filter.to === '');
      let parse = getDataParser(filter);
      let value = parse(record[filter.field]);
      let from = parse(fromnull ? '' : filter.from);
      let to  = parse(tonull ? '' : filter.to);

      // if at least one end of range is set do not allow '' to get through
      // note that for strings '' <= {any-character} e.g. '' <= 'a'
      if ((!fromnull || !tonull) && value === '') {
        return false;
      }
      return ((fromnull || value >= from) && (tonull || value <= to));
    }
  }
}