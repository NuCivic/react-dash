# Configuring the dashboard - settings.js
settings.js defines a declarative configuration for our react-dash.

A simple example:

```eval_rst
.. literalinclude:: ../../examples/js_static_example/settings.js 
   :language: javascript
```

## Regions
### Boostrap rows
Regions are rendered into divs, allowing you to add bootstrap `row` class, and thus to organize the dashboard into rows using the responsive grid.

### Conditional Rendering
If `region.multi = true` then you can use conditional rendering to render the region. If this is the case, then the region should contain an `elements` object. The elements object has keys which each contain a different array of elements. The muli-region should also define a datahandler. The datahandler returns a string which is used as the key to chose an array from the elements object.

@@TODO add example
