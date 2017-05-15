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

The *stateHandler* should return a literal value, which will be applied the state using the handlers *attribute* property. When looking up props, the component checks the state first, and if that prop is set on the state, will use that instead, allowing the state to override props on a case-by-case basis, using *stateHandler.attribute* 

```eval_rst
.. literalinclude:: ../../../examples/customStateHandlers.js
    :start-after: start stateHandler example
    :end-before: end stateHandler example
```

## Attributes
* **name** the name of the stateHandler function
* **attribute** the attribute of the component state which will be set with the return value of the stateHandler
* Any additional paramaters defined in the stateHandler's settings will be available inside the stateHandler function as `handler.myParam` (for example)

## Arguments
stateHandler arguments are the same as dataHandler arguments:
See [data handler arguments](datahandlers#arguments)
