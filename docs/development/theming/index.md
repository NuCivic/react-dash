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
Except for [filter components](), all components are rendered inside of a Card component, which allows for layout and theming.

The Card component exposes a number of regions which can be targeted as props:

### regions ABOVE component / content
* header
* subheader
* topmatter
* subheader2
* topmatter2

### regions BELOW component / content
* footerHeader
* footerSubheader
* bottommatter
* footerSubheader2
* bottommatter2

### Additional card variables
In addition to the regions above, which can be targetted using props, or [stateHandlers](../data/statehandlers.md) the following variables, if present, will be passed to the Card component:
* **iconClass** a font-awesome icon-class to be rendered adjacent to the header
* **cardClasses** an array of classes to be applied to the Card element. Useful for defining bootstrap classes (eg: `cardClasses: ['col-md-6']`)

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

## cardVars

