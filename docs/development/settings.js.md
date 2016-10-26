settings.js
settings.js defines a declarative configuration for our react-dash.

Let's build a very basic dashboard, consisting of a single chart element that we provide with a bit of data.

## EXAMPLE 1 - Simple pie chart with header
```javascript
export var settings = {
  title: 'Hello World',
  components: [
    {
      type: 'Chart',
      data: [
        [{x: 1, y: 10}, {x: 2, y: 20}, {x: 3, y: 30}]
      ],
      settings: {
        type: 'pieChart',
        x: 'x',
        y: 'y'
      }
    }
  ]
}
```

## EXAMPLE 2 - Regions

## EXAMPLE 3 - Fetch Globl Data
