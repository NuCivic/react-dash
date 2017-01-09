# Data Handlers

In order to facilitate the custom handling of data we have introduced the concept of datahandlers. Datahandlers are functions that transform data - they can accept arbitrary paramaters, and have access to the following arguments:

## datahandler definition
*Datahandlers* are defined as props at the component level - `props.datahandlers` is defined as an array of objects, where each object consists of a *name* property, as well as any number of additional properties, which are passed to the datahandler function as properties of the *handler* argument.

Consider:

```javascript
// settings.js:
{
  type: 'Metric',
  caption: 'My Cool Metric',
  dataHandlers: [
    {
        name: 'getRandomMetric'
    },
    {
        name: 'multiplyByFactor',
        factor: 2
    },
    {
        name: 'multiplyByFactor',
        factor: 4
    }
  ]
}
```

Take a look at examples/customDatahandlers.js for an example implementation.

## datahandler arguments

### componentData
Data set on the component as this.state.data - this could come from a fetch call, be passed as props, or through some novel method on a custom component.

### dashboardData 
Also referred to as globalData - this is the data available to the entire dashboard

### handler
The handler as deffined in settings.js. Any properties set on the handler are available as `handler.foo`, etc

### e
Filters use the *e* property to capture the javascript event and pass it along for use in the handler

### appliedFilters 
A global property of the dashboard which indicates what filters are applied at the global level. This object is pf the form:
```javascript
{
    filterValueOne: ["val1", "val2"],
    filterValueTwo: ["val3"]
}
```

### pipelineData
If datahandlers are chained, then *pipelineData* will be the return value of the previous datahandler in the chain. See [chaining](below)

## chaining
If the component.props.dataHandlers array has more than one datahandler then the return value from the first handler will be passed as *pipelineData* to subsequent handlers, in this way composition of components is possible, etc.
