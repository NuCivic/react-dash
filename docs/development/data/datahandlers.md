# Data Handlers
Data handlers are similar in principle to Redux reducers. They take as input the global dashboard state, and the dashboard data, and return a data object which is passed as `props.data` to the component which defined the handler.

## datahandler definition
*Datahandlers* are defined as props at the component level - `props.datahandlers` is defined as an array of objects, where each object consists of a *name* property, as well as any number of additional properties, which are passed to the datahandler function as properties of the *handler* argument.

Consider the following dataHandler configuration for a chart component:

```eval_rst
.. literalinclude:: ../../../examples/settings.js
   :language: javascript
   :emphasize-lines: 215-216 
   :dedent: 4
   :lines: 205-230 
```

And following is the implmentation of the dataHandler function. It recieves the indicators array and colors array from the handler element, and uses them to generate the barChart data series.

```eval_rst
.. literalinclude:: ../../../examples/customDataHandlers.js
   :language: javascript
   :dedent: 2
   :lines: 62-86 
```

## datahandler arguments

### componentData
Data set on the component as this.state.data - this could come from a fetch call, be passed as props, or through some novel method on a custom component.

### dashboardData 
Also referred to as globalData - this is the data available to the entire dashboard

### handler
The handler as deffined in settings.js. Any properties set on the handler are available as `handler.foo`, etc

### e
**DEPRECATED** This is an empty object in the current implementation.

### appliedFilters 
A global property of the dashboard which indicates what filters are applied at the global level. This object is pf the form:
```javascript
{
    filterValueOne: ["val1", "val2"],
    filterValueTwo: ["val3"]
}
```

### pipelineData
If datahandlers are chained, then *pipelineData* will be the return value of the previous datahandler in the chain. See [chaining](#chaining)

## chaining
If the component.props.dataHandlers array has more than one datahandler then the return value from the first handler will be passed as *pipelineData* to subsequent handlers, in this way composition of components is possible, etc.

## Existing Data Handler Libraries
### common
Includes a library of common data transformations.
@@TODO document each handler, but for now you can look in '/src/datahandlers/common.js'

### nvd3
A library of data handling functions for working with NVD3 chart data.
@@TODO document each handler, but for now you can look in '/src/datahandlers/NVD3.js'
