# Fetching Data
All components that extend the [Base Component](../components/Base), including the [Dashboard Component](../components/Dashboard) can receive data in three ways, depending on how the component (or the dashboard) is configured:

### Raw Data
Raw data is passed via the _data_ prop. If the data is in the correct format, as specified by the component specification, it will be rendered as is. 

example:
```javascript
{
  type: 'chart',
  settings: {
    x: 'val',
    y: 'key'
    // ...
  },
  data: [
    [{key: 'a', val: 1}, {key:'a', val: 2}, {key: 'a', val: 3}]
  ]
}
```
Here data is a an array containing a single series which represents variable a as a linear progression. Note that the series is contained as an array, as expected by most of our components. 
See [Data Format](./dataFormat).

### Backends
example:
```javascript
{
  // ... other component configuration
  data: {
    type: 'backend',
    backend: 'CSV',
    url: '/path/to/your.csv'
    // delimeter: '\t' // optionally specify a 
  }
}
```
Data can fetched using one of the existing data backends. Currently, react dashboard supports the following backends:
* [CSV](backends#csv)

### Custom Data Handlers
Data handlers allow you to write custom code to determine how to generate component data or dashboard data.

An example of a component that uses a data handler to generate its data:

in settings.js:
```javascript
{
  // ...other component configuration
  dataHandlers: [
    {
      name: getCustomData,
      fields: ['field1', 'field2']
    }
  ]
}
```

in customDatahanders.js
```javascript
getCustomData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
  let _data = dashboardData;
  let fields = handler.fields;
  return  _.data.map(row => {
    let newRow = {};
    fields.forEach(field => {
        newRow[field] = row[field];
    });
    return newRow;
  });
}
```

For complete documentation about dataHandler functions see [Data Handlers](./dataHandlers).
