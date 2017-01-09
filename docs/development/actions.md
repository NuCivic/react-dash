# Filters
*Filters* update the dashboard state based on user input. The data flow is as follows:

In order to change dashboard state, components need to fire actions. Actions are handled at the Dashboard level and can update the state. For instance, filters fire actions that update `state.appliedFilters`. The appliedFilters object is passed to dataHandlers and can be used for filtering data or making decisions about component state.

All components that inherit from *BaseComponent* have a method called *emit*. Emit triggers actions and an *onAction method* that is automatically called when an action is fired from any component.

It's worth mentioning the *emit method* returns a regular javascript object. By convention it should have an *actionType* but the rest is up to you.

@@TODO update / verify example
```javascript

// Component emitting a change
onClick(){
  this.emit({
    actionType: 'CHANGE',
    data: data
  });
}

// Component receiving a change
onAction(action){
  switch(action.actionType){
    case 'CHANGE':
      // Do some in
      break;
  }
}
```

See also the section on `filters` @@TODO LINK FILTERS 
.. :doc:`/filters`
