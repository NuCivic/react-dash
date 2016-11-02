# NVD3
[NVD3](http://nvd3.org) provides the primary graphing engine in react-dash, via the [react-nvd3](https://github.com/NuCivic/react-nvd3) module.

NVD3 has it's own, sometimes confused, opinions about the shape that data should come in. *React-dash* provides a few basic adaptors that allow us to transform data from our own, sometimes confused, data format. This allows us to keep data in our preferred format until the very last minute, when NVD3 needs it.

*Note* We considered implementing this in the Chart component, and hiding all of this from the library user, but thought it was better (if a bit more laborious) to allow the developer greater flexibility with the data.

The adaptors are implemented and userd like any other [datahandler](datahandlers):

## NVD3.returnChartSeries
Assume that our data is represeted by two series of data in our preferred [format](format):

```javascript
[ 
 [ {a: 1, b: 1}, {a: 2, b: 2 }, {a:3, b: 2} ], // series one
 [ {foo: 1, bar: 1}, {foo: 2, bar: 2 }, {foo:3, bar: 2} ], // series two
]

```

Then the config in settings.js will look like this:
```javascript
{
    type: 'Chart',
    data: [], // put data here
    settings: {
        // ... put settings here
    },
    dataHandlers: [
        {name :}
    ]
}
```

*NVD3.returnChartSeries* is suitable for use for all nvd3 chart types (I think) except pieChart, which uses:

## NVD3.toPieChartSeries
Similar to returnChartSeries. Expects the same input format but the output format is different.
