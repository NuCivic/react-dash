# Actions
In order to change dashboard state, components need to fire actions. Actions are handled at the Dashboard level and can update the state. For instance, filters fire actions that update `state.appliedFilters`. The appliedFilters object is passed to dataHandlers and can be used for filtering data or making decisions about component state.

All components that inherit from *BaseComponent* have a method called *emit*. Emit triggers actions and an *onAction method* that is automatically called when an action is fired from any component.

It's worth mentioning the *emit method* returns a regular javascript object. By convention it should have an *actionType* but the rest is up to you.

## action payload
Actions deliver a payload. The payload has the following attributes:
* **actionType** This determines which onAction hook is fired by the dashboard. You can define new onAction cases by extending the dashboard in your app. Filter components should define an *actionType*.
* **field** Field value defines the key on the appliedFilters object (`state.appliedFilters[field]`). It is often useful for the *field* value to correspond to a column in your data (for instance, filter by *year* field, where *year* is a column in your data)
* **value** In all of our current filter implementations, this is an array of objects:
```javascript
  [
    {label: '2012', value}
  ]
```
* **filter props** As a matter of convention we include all filter props as attributes to the payload. Some of these attributes are used to determine how to apply the filters. See [Filter](./filters.md)

##appliedFilters
The react-dash has a *state.appliedFilters* object which encapsulates the current dashboard configuration. The object looks like:

```javascript
apliedFilters: {
  fieldName1: ["foo"],
  fieldName2: [1, 10, 100]
  // ...
}
```

Applied filters should be used to filter data in your app, update application state, etc.

See also the section on [Filter](./filters.md)
