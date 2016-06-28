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
      return {y: row[s.field], x: row[(this.props.settings.x || 'x' )]};
    });
    return serie;
  });
  return series;
}

/**
 * Convert componentData to series format expected by NVD3 (no pie-) charts
 */
function getChartSeries(componentData, dashboardData, handler, pipelineData) {
  let _data = pipelineData || componentData;
  if (!Array.isArray(_data[0])) _data = [_data]; // series data should be an array of array(s)
  if(!_data.length) return [];
  let series = (handler.series || []).map( (s,i) => {
    let serie = {
      key: s.name,
      color: s.color
    };
    serie.values = _data[i];
    return serie;
  });
  console.log('getChartSeries', series);
  return series;
}

DataHandler.set('NVD3.getChartSeries', getChartSeries);
