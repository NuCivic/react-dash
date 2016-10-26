# Configuring the dashboard - settings.js
settings.js defines a declarative configuration for our react-dash.

Lets look at a few examples.

**NOTE** that these settings files ship with react-dash library. You can replace the examples/settings.js file with any of these files to see them run in your local environment.

## EXAMPLE 1 - Simple pie chart with header
Our hello world example consists of a single pie chart with some static values.

```javascript
export var settings = {
  title: 'Hello World',
  components: [
    {
      type: 'Chart',
      cardStyle: 'Chart',
      header: 'My Pie Chart',
      data: [[{x: 1, y: 40}, {x: 2, y: 40}, {x: 3, y: 20}]],
      dataHandlers: ['NVD3.toPieChartSeries'],
      settings: {
        type: 'pieChart',
        x: 'x',
        y: 'y',
        height: '600'
      },
    }
  ]
}
```

Note that we use a datahandler to convert from our standard data format (an array of series). This is to account for the data 'shape' that nvd3 expects for its pie chart. See [NVD3 Examples](http://nvd3.org/examples/) for a better understandoing of how NVD3 expects data to be formatted.

## EXAMPLE 2 - Regions
```
export var settings = {
  title: 'Hello World',
  components: [
    {
      type: 'Chart',
      cardStyle: 'Chart',
      header: 'My Pie Chart',
      data: [[{x: 1, y: 40}, {x: 2, y: 40}, {x: 3, y: 20}]],
      dataHandlers: ['NVD3.toPieChartSeries'],
      settings: {
        type: 'pieChart',
        x: 'x',
        y: 'y',
        height: '600'
      },
    },
    {
      type: 'Region',
      className: 'row', // row class is used by twitter Bootstrap
      children: [
        {
          type: 'Metric',
          cardStyle: 'Metric',
          iconClass: 'fa fa-level-up',
          className: 'col-md-4', // col class used by twitter Bootstrap
          caption: 'Test A',
          data: ['A'] // an arbitrary value for our example
        },
        {
          type: 'Metric',
          cardStyle: 'Metric',
          iconClass: 'fa fa-level-down',
          className: 'col-md-4',
          background: '#53ACC9',
          caption: 'Test B',
          data: ['B']
        },
        {
          type: 'Metric',
          cardStyle: 'Metric',
          iconClass: 'fa fa-fire',
          caption: 'Test C',
          background: '#C97053',
          className: 'col-md-4',
          data: ['C']
        }
      ]
    }
  ]
}
```
We're starting to introduce more dashboard functionality here, including the use of the Bootstrap grid, by using regions, which have `className: 'row'` and children which have `className: 'col-md-4'`.
More on the [Metric component here](./components/Metric)
More on [theming and bootstrap grid here](./theming)
More on the [Region component here](./components/Region)

## Fecthing Data and Beyond
For now, use the /examples/settings.js file as a guide to understand some of the more complex applications of the dashboard. It includes various examples of fetching and handling data, different chart configurations etc.

