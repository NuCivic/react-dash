# Filter Handlers
Filter handlers are similar to Data Handlers but are fired before the the data is fetched. This allows the ability to change the values which are used to filter the data.

## filterHandler definition

Filter handlers are declared in the ``settings.json`` file similar to data handlers. A key is required which is the filter for which the values will be altered. The value is the function which will return the altered values:

```javascript
filterHandlers: [
  {
    "filterToUpdate": "functionToFilterValues" 
  }
],
```

And following is the implmentation of the filterHandler function. It receives the .

```javascript
functionToFilterValues: (componentData, dashboardData, handler, filter, state, payload) => {
  // Get current values.
  const vals = filter.vals;
  // Do logic to get different values;
  const newVals = functionThatGetsNewVals(vals);
  return newVals;
}
```

## datahandler arguments

### componentData
Data set on the component as this.state.data - this could come from a fetch call, be passed as props, or through some novel method on a custom component.

### dashboardData 
Also referred to as globalData - this is the data available to the entire dashboard

### handler
The handler as deffined in settings.js. Any properties set on the handler are available as `handler.foo`, etc

### filter 
The filter to which values are being updated.

### state 
Current app state.

### payload
The update event that comes from a filter component.
