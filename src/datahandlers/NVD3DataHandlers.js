import DataHandler from '../utils/DataHandler';

/**
 * Transform a array of objects into a datum ready
 * to be consumed by nvd3 chars which supports
 * multiple series like linecharts and multibarcharts.
 *
 * Example:
 * {
 *   name:'fieldsToSeries',
 *   fields: [
 *     {name: 'Price', field: 'price', color:'#FF0000'},
 *   ]
 * }
 */
function fieldsToSeries(componentData, dashboardData, handler) {
  if(!componentData.length) return [];
  let series = (handler.fields || []).map( (s) => {
    let serie = {
      key: s.name,
      color: s.color
    };
    serie.values = componentData.map( (row) => {
      return {y: row[s.field], x: row[(this.props.settings.x || x)]};
    });
    return serie;
  });
  console.log(series);
  return series;
}

/**
 * Parse a field as a date.
 * handler = {
 *   field: 'field_name_to_parse',
 *   name: 'parseFieldDate'
 * }
 */
function parseDateField(componentData, dashboardData, handler) {
  return componentData.map((row) => {
    row[handler.field] = Date.parse(row[handler.field]);
    return row;
  });
}

DataHandler.set('fieldsToSeries', fieldsToSeries);
DataHandler.set('parseDateField', parseDateField);