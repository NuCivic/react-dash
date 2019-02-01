# Application Entry Point - app.js
React dash is a libary for building apps, not an app itself. We need to provide a data handling framework, and we do that in our app.js. Take a look at */examples/app.js* and follow along with the explanations below.
Also, for a good starting place for development, including a working skeleton of an application, along with a development environment, check out the [boilerplate project](https://github.com/NuCivic/react-dash-boilerplate).

## Extend Dashboard

### getDashboardData
We extend the dashboard to provide an implementation of the *getDashbaordData* method. 

Data is segmented into *dataResources*. Each *dataResource* or *dataKey* contains a discreet set of data. *dataResources* should be defined as an array *settings.js* / *props*. Each *dataKey* can contain data required for fetching given data. We leave the implementation details up to you. For more, see the section on Data Handling.

The dashboard is initialized with `state.isFetching = false`. *getDashboardData* should set this state paramater to false when all data has returned.

Also, *getDashboardData()* should set `state.isFetching = false` once all data has been returned.

As per normal REACT, the *setState* call will trigger a re-render of the dashboard, updating components as needed.
