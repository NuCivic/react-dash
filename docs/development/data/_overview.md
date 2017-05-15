# Overview
The basic data pipeline looks something like this:
* Dashboard is instantiated with `state.fetching = true`
* Dashboard calls `getDashboard()` method - it is up to you, the implementer, to define this method.
* When Dashboard renders each component it looks to see if there are:
* * [dataHandlers](#dataHandlers) set. If so, it uses the output of the dataHandlers as the data attribute of the component (props.data
* * [data](#data) set. Data array is passed to component.

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

### Data Handlers (dataHandlers)
In React Dash, data handlers act similaryly to reducers. The are given the dashboard's data and state, and reduce the input to a data object which is passed to a component as `props.data`.

See [Data Handlers](./datahandlers.md)

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
