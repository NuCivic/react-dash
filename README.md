React Dashboard
===============

## What's React Dashboard
It's a collection of tools (components + utils) that can be used to create dashboards programatically. In other words it's a framework to speed up dashboards creation.

## Where is the UI to build dashboards
There is no UI.

## Why?
Because the main goal of this library is to be flexible and code give all the flexibility we need.

## Requirements
* React
* ReactDOM

## Quick start
Using the boilerplate repository is the easiest way to start playing with this library.

```
git clone git@github.com:NuCivic/react-dashboard-example.git
npm install
npm run dev_standalone
open http://localhost:5000
```

## How it works
All the dashboard configuration is stored in a javascript object inside the file src/settings.js. It's a hierarchical representation of a dashboard. They are composed of regions and each region store elements. This elements contains the required information to instantiate a React component base in the type key.

When a dashboard is created it uses the layout configured in the settings an this layout call the renderRegion method which iterates over all the elements for that region. Then the renderRegion method creates the React component with the name set in the type key of that object. Rest of properties of this object is passed to the component as react props.


## Entry point
The entry point of the application is either the src/standalone.js or src/dkan.js depending on the environment you want to use. All the custom components you create needs to be imported in this file. For example we are importing the custom component GAChart which is a subclass of the Chart component.

With all the custom components imported we need to wait until the dom is ready and then render the dashboard in the target dom element.

```javascript
import GAChart from './components/GAChart';
import GAChoropleth from './components/GAChoropleth';
import GATable from './components/GATable';
import GAMetric from './components/GAMetric';
import GAGoal from './components/GAGoal';
import MyCustomLayout from './layouts/MyCustomLayout';
import GADashboard from './dashboard';

/**
 * This renders the GADAshboard
 */
document.addEventListener('DOMContentLoaded', function(event) {
  ReactDOM.render(<GADashboard {...settings} layout={MyCustomLayout}/>, document.getElementById('root'));
});
```

To start you need to create a class extending the Dashboard base class. In the above example you could notice we are not rendering a <Dashboard/> component but the <GADashboard/> component. This is because most of base components are useless without the custom implementation for the project you are working on.
They are like abstract classes and you need to provide the bussines logic to make it work.

## Dashboard configuration
A dashboard configuration looks like this:

```javascript
export var settings = {
  title: 'Georgia Reports',
  regions: {
    top: [
      {
        type: 'Chart'
        ...
      }
      ...
    ],
    left: [],
    ....
  }
}
```

The name of that regions should be available in the layout you are currently using. 

## Layouts
To define a custom layout you need to extend from the base class Layout. That class provides the renderRegion method you need to use to render regions.

Note at the end the Registry.set call. That's mandatory in order to let it know to the dashboard the existence of a new layout. The same applies to all the custom components you create.

```javascript
import React from 'react';
import Layout from '../../src/components/Layout';
import Registry from '../../src/utils/Registry';

export default class MyCustomLayout extends Layout {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">{this.renderRegion(this.props.regions.top)}</div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-lg-3">{this.renderRegion(this.props.regions.middleFirst)}</div>
          <div className="col-sm-6 col-lg-3">{this.renderRegion(this.props.regions.middleSecond)}</div>
          <div className="col-sm-6 col-lg-3">{this.renderRegion(this.props.regions.middleThird)}</div>
          <div className="col-sm-6 col-lg-3">{this.renderRegion(this.props.regions.middleFourth)}</div>
        </div>
        <div className="row">
          <div className="col-md-4">{this.renderRegion(this.props.regions.goalsFirst)}</div>
          <div className="col-md-4">{this.renderRegion(this.props.regions.goalsSecond)}</div>
          <div className="col-md-4">{this.renderRegion(this.props.regions.goalsThird)}</div>
        </div>
        <div className="row">
          <div className="col-md-6">{this.renderRegion(this.props.regions.left)}</div>
          <div className="col-md-6">{this.renderRegion(this.props.regions.right)}</div>
        </div>
        <div className="row">
          <div className="col-md-12">{this.renderRegion(this.props.regions.bottom)}</div>
        </div>
      </div>
    );
  }
}

Registry.set('MyCustomLayout', MyCustomLayout);
```

In the example we are using a custom layout with the following regions:
top, middleFirst, middleSecond, middleThird, middleFourth, goalsFirst, goalsSecond, goalsThird, left, right and bottom.

As final step you need to import into the application your just baked layout:

```
// This should be placed in the entry point
import MyCustomLayout from './layouts/MyCustomLayout';
```

## Adding components

Most of components uses data pulled from somewhere to produce an output (there are some exceptions like the Text component which get the data from its configuration). 

Then before start adding components you need to figure out how to get the data to feed the component. 

Let's try to add a chart:

```
export var settings = {
  title: 'Georgia Reports',
  regions: {
    top: [
      {
        header:'Left',
        iconClass: 'glyphicon glyphicon-fire',
        type: 'GAChart',
        settings: {
          id:'lineChart',
          type: 'discreteBarChart',
          x: 'label',
          y: 'value',
          height: 300,
          margin: {
            left: 38
          },
        },
        fetchData: {type:'function', name: 'getCustomData'},
      },
      ...
    ],
    left: [],
    ....
  }
}
```

All the components has the ability to fechData in several ways. In this case we are configuring the GAChart component to use the method getCustomData to fetchData. This method should be implemented in the subclass and must return either a promise or an array with the data.

For example:

```javascript
// imports
class GAChart extends Chart {
  
  // Synchronous
  getCustomData() {
    return [{key: 'serie1', values: [{x:1, y:1}...] }];
  }

  // Asynchronous
  getCustomData2() {
    return new Promise((resolve, reject) => {
      let dataset = new Dataset({
        backend: 'csv',
        url: 'http://demo.getdkan.com/node/9/download'
      });
      return dataset.fetch().then(() => {
        dataset.query({size: 100, from: 0}).then((data) =>{
          resolve(data.hits)
        });
      });
    });
  }
} 

```
In the above example we have two different methods to fetch data. The first one it's a synchronous call that retrives an array. 

But return an array with data from a function is not very exciting. However we can acces to the data loaded by the dashboard and then process that global data to obtain the data for this element:

```javascript
  getCustomData() {
    return this.props.globalData.filter((record) => record.state === 'georgia');
  }

```
If the data to be used is static then we can place it in the element configuration at the settings file:

```javascript
{
  fetchData: [{key: 'serie1', values: [{x:1, y:1}...] }]
}

```

If you look at the method getCustomData2 you'll notice we don't transform the data in any way. We are using the csv as it is. If that your case then you can use the following method:

```javascript
{
  fetchData: {type: 'backend', backend: 'csv', url: 'http://example.com/example.csv'}
}

```
This is a common scenario for table components.

## Layouts
<React Dashboard> provides a default layout ``layouts/Geary.js`` but you can also create your own layouts. 

To create your own layout add a file to your example project such as the following:
```javascript
import React from 'react';
import Layout from 'react-dashboard/Layout';
import Registry from 'react-dashboard/Registry';

export default class MyCustomLayout extends Layout {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">{this.renderRegion(this.props.regions.top)}</div>
        </div>
        <div className="row">
          <div className="col-md-3">{this.renderRegion(this.props.regions.middleFirst)}</div>
          <div className="col-md-3">{this.renderRegion(this.props.regions.middleSecond)}</div>
          <div className="col-md-3">{this.renderRegion(this.props.regions.middleThird)}</div>
          <div className="col-md-3">{this.renderRegion(this.props.regions.middleFourth)}</div>
        </div>
        <div className="row">
          <div className="col-md-6">{this.renderRegion(this.props.regions.left)}</div>
          <div className="col-md-6">{this.renderRegion(this.props.regions.right)}</div>
        </div>
        <div className="row">
          <div className="col-md-12">{this.renderRegion(this.props.regions.bottom)}</div>
        </div>
      </div>
    );
  }
}

Registry.set('MyCustomLayout', MyCustomLayout); 
```

Layouts are composed of regions. You can create any number of regions by calling the renderRegion method with the region object: 

```javascript
{this.renderRegion(this.props.regions.myCustomRegion)}
```
Note that we are registering the component using the Registry set method. This is a requirement to make Components available inside layouts. Every time you create a new component you'll need to register it.

## Actions
Sometimes you need to notify other components about a change that happen in the application. 

For example change the underlying dashboard data right after the user added a new selection in the autocomplete. Such communication is handled through actions. 

All the components have a method called emit which purpose is to fire actions and an onAction method that is automatically called when an action is fired from any component.

It's worth mentioning the emit method could fire any javascript object. By convention it should have an actionType but the rest is up to you.

```javascript

// Component emitting a change
onClick(){
  this.emit({
    actionType: 'CHANGE',
    data: data
  });
}

// Component receiving a change
onAction(action){
  switch(action.actionType){
    case 'CHANGE':
      // Do some in
      break;
  }
}
```

## Theming
If you don't like the default styles or you want to customize them then you need to import the stylesheet you want to use:

```
// file: entry point 
// standalone.js or dkan.js
import 'stylesheets/custom.css'
```

Currently it accepts either a css or a sass file. You can also add import sentences inside to split the files. It's good to have a separate stylesheet for each component you are overriding. 

## Built-in Components
### Autocomplete

The autocomplete it's using the react select component https://github.com/JedWatson/react-select. As result all the react select configurations can be passed in the element configuration.

Usually you will not need to extend this component because their behavior is pretty standard and its highly configurable.


```javascript     
{
  type: 'Autocomplete',
  name: 'some-name',
  multi: true,
  url: 'http://localhost:3004/options?q={{keyword}}',
},
```
**Available settings**
* **url:** url to fetch the options base on the keyword you typed in the input.
* **multi:** you can enable multi-value selection by setting multi to true. 
* **name:** an arbitrary name.
* **options:** an array with options (e.g.: [{ value: 'one', label: 'One' }])

### Metric

### Card
### Dashboard
### Layout

### Table
### Choropleth Map
### Text

## Development
```
$ git clone git@github.com:NuCivic/react-dashboard.git
$ npm install
$ npm start
```

