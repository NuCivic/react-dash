# Dashboard Component

## Public Methods
### method *`componentWillMount`*
Calls *`getDashboard`* when Dashboard is initally loaded.

### method *`componentDidUpdate`*
Checks *`state.appliedFilters`* for changes - calls *`getDashboard`* if filters have changed.

### method *`getDashboardData`*
This is an abstract method. Your Dashboard should implement its own *`getDashboardData`* method which sets a data object to the dashboard in the following way:
```javascript
// fetch data
setState({data: data});
```
The `stae.data` object is availbe in your *`dataHandlers`* (@@LINK datahandlers)

### method *`getFilters`*
Given a *`key`*, determine which filters should be applied to `state.data[key]`;

### method *`getChildData`*
Apply component *`dataHandlers`* and return data. Will return `props.data` if data is set as props on component.

