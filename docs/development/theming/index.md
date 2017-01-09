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
Cards allow you to use pre-defined themed layouts at the component level. See [Cards](../components/Card).
To enable card layout, add *cardStyle* prop to your component in settings.js:
```javascript
{
  type: 'Chart',
  cardStyle: 'chart',
  header: 'Card renders headers!',
  oconClass: 'fa fa-clock'
  // .... your settings follow
}
```
Components rendered as Cards (ie, components with *cardStyle* prop) can accept the following props:
**cardStyle** Provides css class for additional styling
**iconClass** Font awesome icon class will render icon to the left of any header text (use format `fa fa-icon`)
**header** Render header text

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
