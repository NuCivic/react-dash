# Theming

## Bootstrap grid
React Dash uses bootstrap responsive grid. 
Full docs are [here](https://v4-alpha.getbootstrap.com/layout/grid/)

Define rows and columns as follows in your settings.js file:
```javascript
{
  type: 'Region',
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
```

## cards
Cards allow you to use pre-defined themed layouts at the component level. See [Cards](../components/Card).
To enable card layout, add `cardStyle` prop to your component in settings.js:
```javascript
{
  type: 'Chart',
  cardStyle: 'chart',
  header: 'Card renders headers!',
  // .... your settings follow
}
```

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
