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
Component are rendered inside of the [Card component](../components/Card).

The Card component exposes a number of regions which can be targeted as props:


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
