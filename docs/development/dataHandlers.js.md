# Data Handling

## Data Initialization
All components that extend the [Base Component](../components/Base), including the [Dashboard Component](../components/Dashboard) can receive data in three ways, depending on how the component (or the dashboard) is configured:

### Raw Data
raw data is passed via the _data_ prop. If the data is in the correct format, as specified by the component specification, it will be rendered as is.

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
* [CSV](backends/csv)
* [cartoDB](backends/cartoDB)
* [DKAN](backends/DKAN)

### Custom Data Handlers
Data handlers allow you to write custom code to determine how to generate component data or dashboard data.

An example of a component that uses a data handler to generate its data:

in settings.js:
{
  // ...other component configuration
  dataHandlers: [
    {
      name: getCustomData,
      fields: ['field1', 'field2']
    }
  ]
}

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

#### datahandler settings object
Datahandlers are defined in `settings.js` as an object with a unique `name` paramter. Dot notation can be used in the name to provide structure to your library of datahandlers, if needed.

All paramters except for `name` will be passed to the datahandler function as paramaters to the `handler` argument, and can be used 

#### datahandler paramaters
Data handler functions receive the following paramaters:
* **componentData** - any data set on the calling component
* **dashboardData** - also known as globalData, data set at the top level of the dashboard
* **handler** - the handler object as defined in settings.js. All paramaters, except the required `name` paramter will be properties of this object, accessible inside the handler's scope
* **e** - if the datahandler is called after an action, the jevascript event which fired the action. Useful for handling filter events and user interactions which update data. See [Actions](../actions)
* **appliedFilters** - Any filters which have been applied on the dashboard. See [Actions](../actions)
* **pipelineData** - If the component has defined an array of datahandlers, subsequent datahandlers will be passed the return value from the previous handler, otherwise `undefined`. See [chaining](#chaining)

#### chaining
Datahandlers can be chained, in which case the return value from each handler is passed to the following handler in the chain as `pipelineData`. A trivial example follows:
```javascript
// globalData:
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
function getSeriesByIndex() {
  return [globalData[handler.index]]
}

/**
 * Adds one to all values
 **/
function addOne() {
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
import DataHandler from '../src/utils/DataHandler';

function exampleHandler() {
  // ... your handler code
}

DataHandler.set('exampleHandler', exampleHandler);

// OR:
let handlers = {
  handler1: function() {
    // ... your code
  },

  handler2: function () {
  
  },

  // ...
}

for (let k in handlers) {
  DataHandler.set(k, customDataHandlers[k]);
}

```

## Global Data
Data which is set to the top-level Dashboard component is passed to all components as a globalData prop. It is also available inside of datahandlers as an argument to the datahandler.

## Data Format
In most cases, data is considered as an array (`[]`). 
Multiple series of data can be represented as an array of arrays:
```javascript
    [ 
        [ {key: 1, val: 2}, {key: 1: val: 1}, {key: 1, val: 5} ], 
        [ {key: 2, val: 4}, {key: 2, val: 5}, {key: 2, val: 7} ],
        // ...
    ]
```
Data for a [Metric Component](../components/Metric) could be represented as `[1234]` where 1234 is the value passed to the mertric.

This is not a hard and fast rule - [components](../components) define their own data formats, but [dataHandlers](#dataHandlers) will make some assumptions about data, so it is good to follow these conventions.

## DataHandlers
### Common Datahandlers
### NVD# Datahandlers
### Custom Datahandlers

## Data Object

Data handlers do everything
