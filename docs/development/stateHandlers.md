# StateHandlers
## **NOTE** This is an experimental feature
StateHandlers are similar to [dataHandlers](./data/datahandlers.md).

They are registered and configured in the same way as dataHandlers. Consider:

This stateHandler will call a function `getMaxTempMetricColor` and assign the return value of the function to the component's `state.bg` attribute. The metric uses this attribute to determine what color to be.

## settings.js
```eval_rst
.. literalinclude:: ../../examples/settings.js
  :start-after: start-handlers-example
  :end-before: end-handlers-example
  :language: javascript
```

## stateHandlers.js
```eval_rst
.. literalinclude:: ../../examples/customStateHandlers.js
  :language: javascript
```
