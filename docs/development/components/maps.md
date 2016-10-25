# Choropleth Maps
```eval_rst
.. image:: ../../_static/components/Choropleth_0.4.png
```

@@TODO UPDATE - !!!this is out of date!!!
The **Choropleth** element provides a choropleth map (also known as a "heat map") and a legend. The component uses a set of functions (*choroplethFunctions*) to map domain data to map polygons. The following elements are required to generate the Choropleth:

#### Map Data
Map data provides features suitable for rendering a d3 map. Two formats are supported: **topojson** and **geojson**. 

#### Domain Data
Domain data provides the statistical data necessary to calculate the levels of the choropleth. As with all components, this can be provided by the *globalData* parameter, or fetched via a custom function or using any of the available backends.

#### Configuration object shape
```
{
  type: 'Choropleth',
  format: 'geojson',
  fetchData: {
    url: './data/apollo-parsed-1737-325_0.csv',
    type: 'backend',
    backend: 'csv',
    // delimiter: '\t'
  },
  id: 'Choropleth',
  dataKeyField: 'Zone',
  dataValueField: 'Total Observers',
  geometryKeyField: 'name',
  geometry: './data/zones.geojson', // topojson or geojson
  projection: 'equirectangular', // https://github.com/d3/d3/wiki/Geo-Projections
  scaleDenominator: .7,
  borderColor: '#000000',
  noDataColor: '#F3F3F3',
  dataClassification: 'equidistant',
  legend: {
    // startColor: 'red',
    // endColor: 'yellow',          
    classesCount: 5,
    palleteKey: 'GnBu',
    pallete: ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'],
    domainStartValue: '',
    domainEndValue: '',
  }
  // customMin: '',
  // customMax: '',
  // topologyObject: 'counties'
}
```
**Settings**
* **format**: [_string_] type of geometry file to be used. Actually geojson and topojson geometries are supported.
* **geometry:**: [_string_] path to either a geojson or topojson file.
* **geometryKeyField** (geojson): [_string_] name of the property in the geometry file that will be used to join the domain data with the proper polygon.
* **dataKeyField**: [_string_] field in the domain data that will be used to join join the domain data with the proper polygon.
* **dataValueField**: [_string_] field in the domain data to calculate the levels of the choropleth.
* **projection**: [_string_] the projection to draw the geometry. Available projections can be found at https://github.com/d3/d3/wiki/Geo-Projections. 
* **scaleDenominator**: [__number__] a number to scale the map
* **borderColor**: [__string__] border color for each shape in the geometry
* **noDataColor**: [__string__] shape color when no data is available in a given polygon.
* **startColor(linear scale)**: [__string__] color mapped to the lowest value in the domain data.
* **endColor(linear scale)**: [__string__] color mapped to the highest value in the domain data.
* **dataClassification**: [__string__] kind of scale to be used for data classification. Linear and Equidistant scales are supported.
