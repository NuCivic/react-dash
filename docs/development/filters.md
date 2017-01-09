# Dashboard Filtering
The user interface is represented through filters components. Filters trigger actions on the Dashboard which update `state.appliedFilters`. This triggers a re-render, allowing the Dashboard to respond to the updated application state - by re-fetching data, filtering existing data, reconfiguring the Dashboard etc.

## Filter 

### props
Filters take the following props:
**type** The component type. Filter components should extend BaseFilter component.
**field** This represents a key that will be used on the `state.appliedFilters` object. Depending on the implementation, it can also represent a field in the data.
**action**: NOT IMPLEMENTED. (This will allow for sort or other filter actions in the future)
**willFilter** An array of strings, each string corresponds with a *dataResource* or *dataKey*. This property indicates which part of the dashboard data the filter will be applied to.
**data / dataHandlers** As with all components, data can be passed as an object literal, or calculated via *dataHandlers*. It should be an array of arrays, where each array is a series of key value pairs.
**initVal** An initial value for the filter.

## Example
Consider this filter definition:
```javascript
{
  type: 'Autocomplete',
  className: 'col-md-6',
  name: 'specialty-autocomplete',
  id: 'specialty-autocomplete',
  className: 'specialty-autocomplete',
  field: 'YearMonth',
  action: 'filter', // sort / groupBy / etc
  willFilter: ['climateData'], // array of dkanDataResources keys that filters affect 
  data: [
    [
      { label: '2010', value: '2010' },
      { label: '2011', value: '2011' },
      { label: '2012', value: '2012' },
      { label: '2013', value: '2013' },
      { label: '2014', value: '2014' },
      { label: '2015', value: '2015' },
    ]
  ],
  placeholder: 'Select year to filter dashboard...'
}
```

This will create the following select box:
```eval_rst
.. image:: ../_static/select_screenshot.png
```

If the user selects a year, the dashboard's `state.appliedFilters` object will be updated as follows:

```javascript
state : {
    // ...
    appliedFilters: {
        YearMonth: ['2010']
    }
}
```

Out *`dataHandlers`* have access to the *appliedFilters* values and can filter data accordingly:

```javascript
    Object.keys(appliedFilters).forEach(k => {
      if (k === "year" && appliedFilters[k].length > 0) {
        _data =  _data.filter(row => {
          return _inYear(row, appliedFilters[k]);  
        })
      }
    });
```


### getFilterValue
If the Dashboard has an *appliedFilter* that matches the filters *field* prop, these values will be used.

If no *appliedFilter* is set, the *initVal* prop will be used.

Otherwise, we try to extrapolate a sensible initialization value from the component data.

### Actions & appliedFilters
Filters emit actions which are handled at the Dashboard level. The Dashboard will set the filterValues to appliedFilters, using the filters field prop. 
