import DataHandler from '../utils/DataHandler';

/**
 * Given componentData or pipeLine data containing one or more series of data
 * Return each series as an array of objects where x is defined by specifying function 
 * and y is defined by a field name
 */
function fieldsToXYSeries(componentData, dashboardData, handler, e,  pipelineData) {
  let _data = pipelineData || componentData; 
  if(!_data.length) return [];
  if (!Array.isArray(_data[1])) _data = [_data]; // series data should be an array of array(s)
   
  let series = _data.map(series => {
    let x = handler.xField || 'x';
    let y = handler.field;
    return series.map(row => {
      return {y: row[handler.field], x: row[x]};
    });
    return series;
  });
  
  return series;
}

/**
 * Parse a field as a date.
 * handler = {
 *   field: 'field_name_to_parse',
 *   name: 'parseFieldDate'
 * }
 */
function parseDateField(componentData, dashboardData, handler, e, pipelineData) {
  let _data = pipelineData || componentData;
  return _data.map((row) => {
    row[handler.field] = Date.parse(row[handler.field]);
    return row;
  });
}

/**
 * Sometimes, as in the case of multi-components
 * we just want the event value from the filter
 * In this case, we return it using the following dataHandler
 **/
function getEventReturn(componentData, dashboardData, handler, e, pipelineData) {
  console.log('pass through', arguments);
  if (e) {
    console.log(e.value);
    return e.value;
  }
}

DataHandler.set('common.parseDateField', parseDateField);
DataHandler.set('common.fieldsToXYSeries', fieldsToXYSeries);
DataHandler.set('common.getEventReturn', getEventReturn);
