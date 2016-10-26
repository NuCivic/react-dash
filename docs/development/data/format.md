# Data Format

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

Note that in most places we assume that single series and even single scalar values will be represented within an array.

This is not a hard and fast rule - [components](../components) define their own data formats, but [dataHandlers](#dataHandlers) will make some assumptions about data, so it is good to follow these conventions.

