# Data Handling

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

## Data Initialization
All components that extend the [Base Component](../components/Base), including the [Dashboard Component](../components/Dashboard) can receive data in three ways:

### Raw Data
raw data is passed via the _data_ prop. If the data is in the correct format, as specified by the component specification, it will be rendered as is.

### Backends
Data can fetched using one of the existing data backends. Currently, react dashboard supports the following backends:
* [CSV](backends/csv)
* [cartoDB](backends/cartoDB)
* [DKAN](backends/DKAN)

### Custom Data Handlers
See [below](#datahandlers) for more detail.
Datahandlers are functions that allow you to specify how a piece of the globalData can be used as data for a component. Datahandlers also can be used in series, in which case they receive the return value of the previous handler in the chain.

## Global Data
Data which is set to the top-level Dashboard component is passed to all components as a globalData prop. It is also available inside of datahandlers as an argument to the datahandler.

## DataHandlers
### Common Datahandlers
### NVD# Datahandlers
### Custom Datahandlers

## Data Object

Data handlers do everything
