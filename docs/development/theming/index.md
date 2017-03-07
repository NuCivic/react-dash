# Theming

## Bootstrap grid
React Dash uses bootstrap responsive grid. 
Full docs are [here](https://v4-alpha.getbootstrap.com/layout/grid/)


Layout is defined as an array of regions. Each region represents a bootstrap row, as follows:

```javascript

regions: [
    { 
      className: 'row',
      children: [
        {
          type: 'Metric',
          value: 'A',
          className: 'col-4-md'
        },
        {,
          type: 'Metric',
          value: 'B',
          className: 'col-4-md'
        },
        {
          type: 'Metric',
          value: 'B',
          className: 'col-4-md'
        }
      ]
    }
]
```

Note that we're just using the bootstrap classes to define the responsive grid.

## cards
Some elements are rendered inside of a Card component: Chart, DataTable, Metric, Goal, Highlight, Markup, Metric and Choropleth.

Components rendered inside Card can accept the following props:

**cardStyle** Provides css class for additional styling
**iconClass** Font awesome icon class will render icon to the left of any header text (use format `fa fa-icon`)
**header** Render header text/markup
**footer** Render footer text/markup

Also, the component can define these properties on the `state` (using stateHandlers or native component code) and they will be passed to the wrapping Card component as follows:

```eval_rst
.. literalinclude:: ../../../src/components/Chart.js
  :start-after: doc-block-start
  :end-before: doc-block-end
  :language: javascript
```

See also [State Handlers](../stateHandlers.md)

## custom css
The `index.html` file in the examples project loads `static/custom.css`. Add custom css here.

## inline styles
Define a style object in `settings.js`:
```javascript
{
  type: 'yourComponentType',
  style: {height: '100%', maxWidth: '60%', fontFamily: '"Times New Roman", Georgia, Serif'}
}
```
