# Application Entry Point - app.js
```eval_rst
.. literalinclude:: ../../examples/app.js
    :linenos:
    :language: javascript
```
React dash is a libary for building apps, not an app itself! We need to provide a data handling framework, and we do that in our app.js. Take a look at */examples/app.js* and follow along with the explanations below.

## Extend Dashboard

### getDashboardData
We extend the dashboard to provide an implementation of the *getDashbaordData* method. 

Note that we assume that data is segmented into *dataResources*. Each *dataResource* or *dataKey* contains a discreet set of data. *dataResources* should be defined as an array *settings.js* / *props*. Each *dataKey* can contain data required for fetching given data. We leave the implementation details up to you.

In the example we loop through each *dataResource* and call *fetchBackend* which sets the response object to `state.data[dataKey]`

As per normal REACT, the *setState* call will trigger a re-render of the dashboard, updating components as needed.

Note that we use a custom *applyFilters* method that maps current application state (*appliedFilters*) onto our data fetching code. You can use this opportunity to apply filter paramters to an API call, to remap current dashboard data, etc.
