# Data Table
This is a fork of facebook's [fixed-data-table product](https://facebook.github.io/fixed-data-table/).

```eval_rst
.. image:: ../../_static/components/DataTable_0.4.png
```

Here's an example of the configuration:

```eval_rst
.. literalinclude:: ../../../examples/js_static_example/settings.js 
    :start-after: start DataTable Example
    :end-before: end DataTable Example
    :dedent: 4
```

**Available settings**
* *hideControls* Hide the controls
* **hideFilterHeader** Hide the filter controls
* **settings**:
  - **settings.table:** allows to configure all the properties for a table
  - **settings.columns:** allows to configure all the properties for columns
  - **settings.cells:** allows to configure all the properties for cells
  - **overrides:** allows to override configurations for the cell in the row number used as key.
  - **settings.hideControls:** Hide row-numbers select in table header..
  - **settings.hideFilterHeader:** Hide filter box in table header.
* **overrides**
  - **overrides.columns** An object keyed to the header title
  - **overrides.rows**
  - **overrides.cells**

** DATA **
Data should be in the format given in the example above. The first row of data will be used as headers.

