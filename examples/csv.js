console.log('csv1');

const CSV = {};
CSV.__type__ = 'csv';

CSV.fetch = function(dataset) {
  return new Promise((resolve, reject) => {
    if (dataset.file) {
      var reader = new FileReader();
      var encoding = dataset.encoding || 'UTF-8';
      reader.onload = function(e) {
        var out = CSV.extractFields(CSV.parse(e.target.result, dataset), dataset);
        out.useMemoryStore = true;
        out.metadata = {
          filename: dataset.file.name
        };
        resolve(out);
      };
      reader.onerror = function (e) {
        console.log('Failed to load file. Code: ' + e.target.error.code);
        reject(e);
      };
      reader.readAsText(dataset.file, encoding);
    } else if (dataset.data) {
      var out = CSV.extractFields(CSV.parse(dataset.data, dataset), dataset);
      out.useMemoryStore = true;
      resolve(out);
    } else if (dataset.url) {
      console.log('1', dataset);
      fetch(dataset.url)
      .then(res => {
        console.log('2');
        return res.text();
      })
      .then(data => {
        console.log('3', data);
        var out = CSV.extractFields(CSV.parse(data, dataset), dataset);
        out.useMemoryStore = true;
        resolve(out);
      }).catch(e => {
        console.log('Error fetching data', e);
        reject(e);
      });
    } else {
      console.log('Invalid dataset');
      reject('Invalid dataset.');
    }
  });
};

// Convert array of rows in { records: [ ...] , fields: [ ... ] }
// @param {Boolean} noHeaderRow If true assume that first row is not a header (i.e. list of fields but is data.
CSV.extractFields = function(rows, dataset) {
  if (dataset.noHeaderRow !== true && rows.length > 0) {
    var fields = rows[0];
    var records = rows.slice(1).map(row => { return row.map((val, key) => { 
        let x = {};
        x[fields[key]] = val;
        return x;
      }); 
    });
    return {
      fields: fields,
      records: records
    };
  } else {
    return {
      records: rows
    };
  }
};

CSV.normalizeDialectOptions = function(options) {
  // note lower case compared to CSV DDF
  var out = {
    delimiter: ',',
    doublequote: true,
    lineterminator: '\n',
    quotechar: '"',
    skipinitialspace: true,
    skipinitialrows: 0
  };
  for (var key in options) {
    if (key === 'trim') {
      out.skipinitialspace = options.trim;
    } else {
      out[key.toLowerCase()] = options[key];
    }
  }
  return out;
};

// ## parse
//
// For docs see the README
//
// Heavily based on uselesscode's JS CSV parser (MIT Licensed):
// http://www.uselesscode.org/javascript/csv/
CSV.parse= function(s, dialect) {
  // Get rid of any trailing \n
  s = chomp(s);

  var options = CSV.normalizeDialectOptions(dialect);

  var cur = '', // The character we are currently processing.
    inQuote = false,
    fieldQuoted = false,
    field = '', // Buffer for building up the current field
    row = [],
    out = [],
    i,
    processField;

  processField = function (field) {
    if (fieldQuoted !== true) {
      // If field is empty set to null
      if (field === '') {
        field = null;
      // If the field was not quoted and we are trimming fields, trim it
      } else if (options.skipinitialspace === true) {
        field = trim(field);
      }

      // Convert unquoted numbers to their appropriate types
      if (rxIsInt.test(field)) {
        field = parseInt(field, 10);
      } else if (rxIsFloat.test(field)) {
        field = parseFloat(field, 10);
      }
    }
    return field;
  };

  for (i = 0; i < s.length; i += 1) {
    cur = s.charAt(i);

    // If we are at a EOF or EOR
    if (inQuote === false && (cur === options.delimiter || cur === '\n')) {
      field = processField(field);
      // Add the current field to the current row
      row.push(field);
      // If this is EOR append row to output and flush row
      if (cur === '\n') {
        out.push(row);
        row = [];
      }
      // Flush the field buffer
      field = '';
      fieldQuoted = false;
    } else {
      // If it's not a quotechar, add it to the field buffer
      if (cur !== options.quotechar) {
        field += cur;
      } else {
        if (!inQuote) {
          // We are not in a quote, start a quote
          inQuote = true;
          fieldQuoted = true;
        } else {
          // Next char is quotechar, this is an escaped quotechar
          if (s.charAt(i + 1) === options.quotechar) {
            field += options.quotechar;
            // Skip the next char
            i += 1;
          } else {
            // It's not escaping, so end quote
            inQuote = false;
          }
        }
      }
    }
  }

  // Add the last field
  field = processField(field);
  row.push(field);
  out.push(row);

  // Expose the ability to discard initial rows
  if (options.skipinitialrows) out = out.slice(options.skipinitialrows);

  return out;
};

CSV.objectToArray = function(dataToSerialize) {
  var a = [];
  var fieldNames = [];
  var ii;
  var jj;

  for (ii = 0; ii < dataToSerialize.fields.length; ii++) {
    fieldNames.push(dataToSerialize.fields[ii].id);
  }
  a.push(fieldNames);
  for (ii = 0; ii < dataToSerialize.records.length; ii++) {
    var tmp = [];
    var record = dataToSerialize.records[ii];
    for (jj = 0; jj < fieldNames.length; jj++) {
      tmp.push(record[fieldNames[jj]]);
    }
    a.push(tmp);
  }
  return a;
};

// ## serialize
//
// See README for docs
//
// Heavily based on uselesscode's JS CSV serializer (MIT Licensed):
// http://www.uselesscode.org/javascript/csv/
CSV.serialize = function(dataToSerialize, dialect) {
  var a = null;
  if (dataToSerialize instanceof Array) {
    a = dataToSerialize;
  } else {
    a = CSV.objectToArray(dataToSerialize);
  }
  var options = CSV.normalizeDialectOptions(dialect);

  var cur = '', // The character we are currently processing.
    field = '', // Buffer for building up the current field
    row = '',
    out = '',
    i,
    j,
    processField;

  processField = function (field) {
    if (field === null) {
      // If field is null set to empty string
      field = '';
    } else if (typeof field === 'string' && rxNeedsQuoting.test(field)) {
      if (options.doublequote) {
        field = field.replace(/"/g, '""');
      }
      // Convert string to delimited string
      field = options.quotechar + field + options.quotechar;
    } else if (typeof field === 'number') {
      // Convert number to string
      field = field.toString(10);
    }

    return field;
  };

  for (i = 0; i < a.length; i += 1) {
    cur = a[i];

    for (j = 0; j < cur.length; j += 1) {
      field = processField(cur[j]);
      // If this is EOR append row to output and flush row
      if (j === (cur.length - 1)) {
        row += field;
        out += row + '\n';
        row = '';
      } else {
        // Add the current field to the current row
        row += field + options.delimiter;
      }
      // Flush the field buffer
      field = '';
    }
  }

  return out;
};

var rxIsInt = /^\d+$/,
  rxIsFloat = /^\d*\.\d+$|^\d+\.\d*$/,
  // If a string has leading or trailing space,
  // contains a comma double quote or a newline
  // it needs to be quoted in CSV output
  rxNeedsQuoting = /^\s|\s$|,|"|\n/,
  trim = (function () {
    // Fx 3.1 has a native trim function, it's about 10x faster, use it if it exists
    if (String.prototype.trim) {
      return function (s) {
        return s.trim();
      };
    } else {
      return function (s) {
        return s.replace(/^\s*/, '').replace(/\s*$/, '');
      };
    }
  }());

function chomp(s) {
  if (s.charAt(s.length - 1) !== '\n') {
    // Does not end with \n, just return string
    return s;
  } else {
    // Remove the \n
    return s.substring(0, s.length - 1);
  }
}

export default CSV;
