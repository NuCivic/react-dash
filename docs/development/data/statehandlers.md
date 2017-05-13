# State Handlers
State handlers (stateHandlers) work in a similar manner to [data handlers](vdatahandlers), but they are called later in the lifecycle, AFTER the component has been populated with data. At this point the stateHandler 

## definition
*stateHandlers* are defined as props at the component level - `props.datahandlers` is defined as an array of objects, where each object consists of a *name* property, as well as any number of additional properties, which are passed to the datahandler function as properties of the *handler* argument.

Consider the following stateHandler configuration for a chart component:

```eval_rst
.. literalinclude:: ../../../examples/settings.js
    :start-after: start stateHandler example
    :end-before: end stateHandler example
    :dedent: 4
```


```eval_rst
.. literalinclude:: ../../../examples/customStateHandlers.js
    :start-after: start stateHandler example
    :end-before: end stateHandler example
```

## Arguments
See [data handler arguments](datahandlers#arguments)
