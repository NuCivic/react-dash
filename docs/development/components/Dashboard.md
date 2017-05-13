# Dashboard Component

## Required Props
* *regions* Regions is an array of objects, each object representing a region. See [Regions](./Region.md)
* *doFilterRouting* **filter routinig is under construction - this should be set to FALSE**

## Public Methods
### method *`componentWillMount`*
Calls *`getDashboard`* when Dashboard is initally loaded.

### method *`componentDidUpdate`*
Sets `state.isFetching` to true. Calls `getDashboardData()`.

### method *`getDashboardData`*
This is an abstract method. Your Dashboard should implement its own *`getDashboardData`* method which sets a data object to the dashboard in the following way:
```javascript
// fetch data
setState({data: data});
```

When all data has been returned, `getDashboardData()` should set `state.isFetching = false`

### method *`getFilters`*
Given a *`key`*, determine which filters should be applied to `state.data[key]`;

### method *`getChildData`*
Apply component *`dataHandlers`* and return data. Will return `props.data` if data is set as props on component.

