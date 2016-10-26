# Data Handlers
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

In this example, we tell our component to use a custom datahandler called getCustomData. We use an array of field names to select a subset of the dashboard's global data.
See [datahandler settings object](datahandler-settings-object) amd [datahandler paramaters](datahandler-paramaters) below:

#### datahandler settings object
Datahandlers are defined in `settings.js` as an object with a unique `name` paramter. Dot notation can be used in the name to provide structure to your library of datahandlers, if needed.

All paramters except for `name` will be passed to the datahandler function as paramaters to the `handler` argument, and can be used 
example:
```javascript
// in settings.js
{
  type: 'metricComponent'
  dataHandlers: [
    {
      name: 'anotherCustomeHandler',
      arg1: {foo: 'bar', bar: 'baz'},
      arg2: [1,2,3],
      // etc - any valid javascript/json data can be passed to the data handler
    }
  ]
}
```

These attributes can now be used within `anotherCustomHandler` by accessing `handler.arg1`, `handler.arg2`, etc.
#### datahandler paramaters
Data handler functions receive the following paramaters:
* **componentData** - any data set on the calling component
* **dashboardData** - also known as globalData, data set at the top level of the dashboard
* **handler** - the handler object as defined in settings.js. All paramaters, except the required `name` paramter will be properties of this object, accessible inside the handler's scope
* **e** - if the datahandler is called after an action, the jevascript event which fired the action. Useful for handling filter events and user interactions which update data. See [Actions](../actions)
* **appliedFilters** - Any filters which have been applied on the dashboard. See [Actions](../actions)
* **pipelineData** - If the component has defined an array of datahandlers, subsequent datahandlers will be passed the return value from the previous handler, otherwise `undefined`. See [chaining](#chaining)

#### chaining
Data handlers can be chained, in which case the return value from each handler is passed to the following handler in the chain as `pipelineData`. 
A trivial example follows:
```javascript
// assume that globalData is as follows:
{
    seriesOne: [{key: 1, val: 1}, {key: 1, val: 2}, {key: 2, val:2 }],
    seriesTwo: [{key: a, val: 11}, {key: b, val: 2}, {key: c, val:6 }]
    // ...
}

// settings.js
{
  type: 'Metric',
  dataHandlers: [
    {
      name: 'getSeriesByIndex',
      index: 'seriesOne'
    },
    {
      name: 'addOne',
      x: 'val'
    },
    {
      name: 'double',
      x: 'val'
    }
  ]
}

// customDatahandlers.js
/**
 * returns keyed data from globalData
 **/
function getSeriesByIndex(componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
  return [globalData[handler.index]]
}

/**
 * Adds one to all values
 **/
function addOne(componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
  // check for pipeline data first, or use componentData if exists
  let _data = pipelineData || componentData || [];
  _data.map(series => {
    series.forEach(row => {
      row[handler.x] = row[handler.x]*2
    });
    return series;
  }) 
}
```

I'll leave it as an excercise for you to implement the `double` dataHandler :)

#### registering data handlers
In order for everything to work, data handlers must be registered as follows:

```javascript
// customDatahandlers.js
import DataHandler from 'react-dash';

function exampleHandler(componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
  // ... your handler code
}

DataHandler.set('exampleHandler', exampleHandler);

// OR:
let handlers = {
  handler1: function(componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    // ... your code
  },

  handler2: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    // ... your code
  },

  // ...
}

for (let k in handlers) {
  DataHandler.set(k, customDataHandlers[k]);
}

```

## @@TODO Provided Data Handlers
