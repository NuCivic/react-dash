# Autocomplete Component

Autocomplete uses the *react select component* https://github.com/JedWatson/react-select. As a result all the *react select* configurations can be passed in the element configuration.

```javascript     
{
  type: 'Autocomplete',
  name: 'some-name',
  multi: true,
  url: 'http://localhost:3004/options?q={{keyword}}',
},
```

**Available settings**
* **willFilter:** An array of values where each value referes to a dataResource which the filter applies to
* **disabledBy:** An array of values where each value is the *field* attribute of another filter. If the referenced filter is enabled, the current filter will be disabled.
* **multi:** you can enable multi-value selection by setting multi to true. 
* **field:** an arbitrary name, or key, for the filter - this will be the key for `state.appliedFilters[field]`. It is often helpful for the field name to correspond to a column variable in your data.
* **data:** an array with options (e.g.: [{ value: 'one', label: 'One' }])
* **dataHandlers:** Alternately, you can use a data handler to return the component data - this is useful if your autocomplete options are derived from dashbaord data
