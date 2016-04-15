React Dashboard
===============
## What's React Dashboard
* A collection of tools (components + utils) that can be used to create dashboards programatically.
* A a framework to speed up dashboards creation.
* components + configurations + data

## What React Dashboard is not
* Not a tool to transform data.
* Not an end-user tool.

## Features
* **Extreme customizable components**
* **Component communication through actions**
* **Ability to fetch data in different formats** like: CSV, DKAN resources, CartoDB tables, etc. (in progress: XLSX, CKAN resources, Google Spreadsheets)
* **Ability to query data:** filter, paginate, facets, etc.
* **Fully serializable:** then you can save a dashboard in a database.
* **Themeable**
* **A lot of available charts provided by NVD3**
  - boxPlot
  - bullet
  - candlestickBar
  - cumulativeLine
  - discreteBar
  - historicalBar
  - line
  - line with bar
  - line with focus widget
  - multiBar
  - multiBarHorizontal
  - ohlcBar
  - parallelCoordinates
  - pie
  - scatter / bubble
  - stackedArea
  - sunburst
* **A lot of components ready to use:**
  - Table
  - Autocomplete
  - Goal
  - Metric
  - Tex
  - Choropleth
* **Extensible:** you can add new react components. In fact you can include any react component and pass the properties as settings.

### Where is the UI to build dashboards?
There is no UI to create **React Dashboards**. Everything is generated from code.

### Why?
The main goal of this library is to be flexible for developers, and using code provides the greatest flexibility.

## Requirements
* React (https://facebook.github.io/react/)
* ReactDOM

## Quick start
Using the boilerplate repository is the easiest way to start playing with this library.

```
git clone git@github.com:NuCivic/react-dashboard-boilerplate.git
npm install
npm run dev_standalone
open http://localhost:5000
```

## How it works

Dashboard configuration is stored as a javascript object inside the file *src/settings.js*. It's a hierarchical representation of a dashboard. Each dashboard is composed of regions and each region stores elements. These elements contain the required information to instantiate a *React* component based on the _type_ key.

When a dashboard is created it uses the _layout_ configured in the settings. The _layout_ is then loaded by the *renderRegion* method, which iterates over all the elements for that region. Then the *renderRegion* method creates the *React* component with the name set in the _type_ key of that settings object. The rest of the properties of this object are passed to the component as *React* _props_.


## Entry point
The entry point to the application is either the *src/standalone.js* or *src/dkan.js* file, depending on which environment you are using. **_All of the custom components you create need to be imported into this file._** For example, we're importing the custom component *GAChart* which is a subclass of the *Chart* component.

Once the custom components are imported we need to wait until the *dom* is ready and then render the dashboard in the *target dom* element.

```javascript
import GAChart from './components/GAChart';
import GAChoropleth from './components/GAChoropleth';
import GATable from './components/GATable';
import GAMetric from './components/GAMetric';
import GAGoal from './components/GAGoal';
import MyCustomLayout from './layouts/MyCustomLayout';
import GADashboard from './dashboard';
import settings from 'settings';

/**
 * This renders the GADAshboard
 */
document.addEventListener('DOMContentLoaded', function(event) {
  ReactDOM.render(<GADashboard {...settings} layout={MyCustomLayout}/>, document.getElementById('root'));
});
```

To start, create a class that extends the **Dashboard** base class. 

In the above example, notice that we use the <GADashboard/> component, **not** a <Dashboard/> component. That's because most of the base components are useless without the custom implementation for the project you're working on.

They're like abstract classes, and you need to provide the business logic to make them work.

```javascript
import React, { Component } from 'react';
import {Dashboard} from '../src/ReactDashboard';
import Dataset from '../src/models/Dataset';


export default class GADashboard extends Dashboard {

  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  onAction(payload) {
    switch(payload.actionType) {
      case 'AUTOCOMPLETE_CHANGE':
        console.log('AUTOCOMPLETE_CHANGE');
        break;
    }
  }

}
```



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

The name of each region should be available in the layout you are currently using. 

## Layouts
To define a custom layout you need to extend from the base class *layout*. That class provides the *renderRegion* method you need to use to render regions.

**Note**: You must call *Registry.set* after defining and exporting the layout. 

It is mandatory to register a new layout in the dashboard. 
The same applies to any custom components you create.

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

In our example, we're using a custom layout with the following regions:

* top 
* middleFirst 
* middleSecond 
* middleThird 
* middleFourth 
* goalsFirst 
* goalsSecond 
* goalsThird 
* left, right and bottom

As the final step, import your new layout into the dashboard:

```javascript
// This should be placed in the entry point
import MyCustomLayout from './layouts/MyCustomLayout';
```

## Adding components

Most components pull data from an external source to produce an output (there are some exceptions like the *Text* component, which pulls data from its configuration). 

Before you start adding components, you'll need to determine the data source that will feed the component. 

### Let's try to add a chart:

```javascript
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


### Fetch Data

All components have the ability to fech data in several ways. In this case, we're configuring the *GAChart* component to use the method *getCustomData* to fetch data. This method should be implemented in the subclass and must return either a promise or an array with the data.

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
In the example above we have two different methods to fetch data. The first one is a synchronous call that retrieves an array. 

But returning an array with data from a function is not very exciting. However we can access the data loaded by the dashboard and then process that global data to get the data for this element:

```javascript
  getCustomData() {
    return this.props.globalData.filter((record) => record.state === 'georgia');
  }

```
If the data to be used is static then we can place it in the element's configuration in the settings file:

```javascript
{
  fetchData: [{key: 'serie1', values: [{x:1, y:1}...] }]
}

```


If you look at the method *getCustomData2* you'll notice we don't transform the data in any way. We're using the csv as-is. If that's your case then you can use the following method:



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

### Creating a region

Layouts are composed of regions. You can create any number of regions by calling the *renderRegion* method with the region object: 


```javascript
{this.renderRegion(this.props.regions.myCustomRegion)}
```

**Note**: We're registering the component using the *Registry set* method. 

This is a requirement to make components available inside layouts. Every time you create a new component you'll need to register it.

## Actions
Sometimes you need to tell other components about a change that happened in your dashboard. For example, a change in the underlying dashboard data after adding a new selection in the autocomplete. 

This is handled through **actions**. 

All components have a method called *emit*. Emit triggers actions and an *onAction method* that is automatically called when an action is fired from any component.

It's worth mentioning the *emit method* returns a regular javascript object. By convention it should have an *actionType* but the rest is up to you.

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
The **React Dashboard** comes with default styles, but you can also customize them by importing a stylesheet. 

```javascript
// file: entry point 
// standalone.js or dkan.js
import 'stylesheets/custom.css'
```

Currently you can use either a *css* or a *sass* file. You can also add import sentences inside to split the files. It's good to have a separate stylesheet for each component you are overriding. 


## Built-in Components

### Shared settings
Some settings are shared across all the components. This is the complete list of shared settings:

**Available settings**
* **fetchData:** define the fetch data strategy used in the current component.
* **queryObj:** the query to be used after data fetching. For example this would allow you to filter the raw dataset for pagination.


### Autocomplete

Autocomplete uses the *react select component* https://github.com/JedWatson/react-select. As a result all the *react select* configurations can be passed in the element configuration.

Usually you won't need to extend this component. Autocomplete has standard behavior and is highly configurable.


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

### Choropleth
The **Choropleth** element provides a choropleth map (also known as a "heat map") and a legend. The component uses a set of functions (*choroplethFunctions*) to map domain data to map polygons. The following elements are required to generate the Choropleth:

#### Map Data
Map data provides features suitable for rendering a d3 map. Two formats are supported: **topojson** and **geojson**. 
**Required topojson settings**
* **polygon:** [_string_] dictates what objects to use to map polygons
* **mesh:** [_string_] key to topojson mesh object

#### Domain Data
Domain data provides the statistical data necessary to calculate the levels of the choropleth. As with all components, this can be provided by the *globalData* paramter, or fetched via *getData*.
In order to play well with the default choropleth functions, *domain  data* should be formatted so that a 

Domain data should be formatted as follows
```javascript
   [
    {
      mapKey: 'PKValue', // required
      domainField: 'Value', // required
      ignoredVal: 'foo',
      moreExtraneousData: {...}
    },
    // ... etc ...
   ]
```
#### Settings
**Required settings**
* **mapDataUrl:** A url to a valid geojson or topojson object
* **mapFormat:** Either **topojson** or **geojson**
* **dataset:** [_object_] an object containing paramaters to instantiate a data backend (see backends)
* **legendHeader:** Header text appears above Legend
* **levels:** [_int_] Number of levels to calculate for choropleth
* **domainLower:** Lower limit when calculating levels
* **domainUpper:** Upper limit when calculating levels
* **domainKey:** A key value to associate a row of domain data with a map polygon
* **domainMapKey:** The map polygon associated with the domain data key above
* **domainField:** The field in a domain data row which contains the value to compare
* **tooltip:** [_object_] An object contain a **label** attribute and an *attr* attribute which contains the key to an element in domain data row
* **showTooltip:** [_boolean_]

#### Internals
Internally, the **choropleth component** uses the **getChoroplethFunctions** method to create a dictionary of functions which determine the choropleth behavior:
```javascript
roplethFunctions() {
    let domainField = this.props.settings.domainField;
    let domainKey = this.props.settings.domainKey;
    let dict = {
	/**
	 * Returns an object to be rendered as tooltip content
         * {
         *  someKeyName : theValue
         * }
         */
        tooltipContent: d => {
          let label = this.props.settings.tooltip.label;
          let val = d[d[this.props.settings.domainMapKey]];
          let tt = {};
          tt[label] = val;
          return tt;
        },

        /**
         * The item from a domainData row to evaluate
         **/
        domainValue: d => {
          return Number(d[domainField]);
        },

        /**
         * The domainData key associated with a map arrea
         **/
        domainKey: d => {
          return d[domainKey];
        },

        /**
         * The map area key associated with a row of domain data
         **/
        mapKey: d => {
          Object.assign(d, d.properties);

          return d[this.props.settings.domainMapKey];
          return d.properties[this.props.settings.domainMapKey]; //omainKey;
        }

    };

    return dict;
  }
```
**Choropleth functions**
* **domainValue:** The function, when applied to a row **d** of domain data should return a value for evaluation in the choropleth (for instance, the unemployment rate of a county, birth rate of a state, etc)
* **domainKey:** This function should return a value that will associate the row of data with a map region.
* **mapKey:** Should return a value equal to domainKey, above.
* **tooltipContent:** Return a key/value pair which is displayed as tooltip on hover. **d** is the current row of data. (example: {unemploymentRate : d[rate]})

### Metrics

**Metrics** are intended to display a computed single value to the end-user. The basic class **Metrics** should be extended in order to override the base component's _getMetric_ function. 

Your custom _getMetric_ function can compute metrics derived from the *globalData* prop.
As with all components you can override the *fetchData* property to fecth external data.

```javascript
{
  type:'GAMetric',
  background: '#9F3E69',
  metric: 'getRandomMetric',
  caption: 'New Users',
  fetchData: {type: 'function', name: 'externalData'}
}
```

**Available settings**
* **background:** the background color to be used for this metric. 
* **metric:** a function defined in the subclass component that retrives the metric number. 
* **caption:** a description to be displayed 
* **options:** an array with options (e.g.: [{ value: 'one', label: 'One' }])


### Card

A **Card** is a html wrapper to keep the styles consistent across elements. This class can't be overridden, and it will never be used directly. All the card configuration properties should be passed to the element you are rendering.

**For example:**

```javascript
{
  header: 'Hello Metric',
  type:'GAMetric',
  metric: 'getRandomMetric',
  caption: 'New Users',
  footer: 'This is a footer text',
}
```

### Dashboard

This is the top parent element of a **Dashboard**. You'll typically extend the dashboard class with your custom dashboard subclass so that you can create a custom way to fetch data. 

If your data is a plain CSV file (or any resource supported by backends) and you don't need to perform transformations on it then you can use the *fetchData* property.

**Available settings**
* **title:** Dashboard title.
* **layout:** Layout class name to be used in the dashboard. You can pass this as any other *react prop* if you want.


### Text

**Text** component allows you to create a block of text by setting the content property with the desired html.


```javascript
{
  header: 'This is an awesome text',
  type: 'Text',
  content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat dui, sodales eleifend placerat a, dictum sed tortor.</p><p> Quisque porttitor urna in est vehicula, a molestie nunc pharetra. Cras vehicula nisi dui, ut aliquam nunc vulputate lacinia. Curabitur vitae interdum dolor, sed venenatis tellus. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat metus et ipsum lobortis, at porttitor nunc laoreet.</p><p>Nullam et ligula at enim pretium accumsan. In et facilisis enim, vel consectetur justo. Duis eleifend sit amet neque eu interdum. Sed ornare orci diam, ac finibus ipsum posuere vel. Duis maximus velit ipsum, et mattis massa tempus sit amet. Suspendisse potenti.</p>',
}
```


**Available settings**
* **content:** the html content to display.

### Table

**Table** component provides a way to browse, filter, search and display datasets to end-users. 

```javascript    
{
  type: 'GATable',
  header: 'Mi titulo',
  fetchData: {
    type:'backend',
    backend: 'csv',
    url: 'http://demo.getdkan.com/node/9/download',
  },
  settings: {
    table: {
      rowHeight: 40,
      width: 800,
      maxHeight: 300,
      headerHeight:40
    },
    columns: {
      flexGrow: 1,
      width: 150,
      overrides: {
        a1: {
          flexGrow: 0.5
        }
      }
    },
    cells: {
      height: 40,
      width: 500,
      overrides: {
        1: {
          height: 40
        }
      }
    }
  }
},
```
**Available settings**
* **settings**:
  - **settings.table:** allows to configure all the properties for a table
  - **settings.columns:** allows to configure all the properties for columns
    - **overrides:** allows to override configurations for the column name number used as key.
  - **settings.cells:** allows to configure all the properties for cells
  - **overrides:** allows to override configurations for the cell in the row number used as key.


### Chart
**Chart** component is a wrapper of the *react-nvd3* library, which is also a wrapper of the *nvd3* chart library. That meanas all the charts and options available in nvd3 are also available in this component.


```javascript
{
  header:'Top',
  type: 'GAChart',
  iconClass: 'glyphicon glyphicon-tree-conifer',
  settings: {
    id:'lineChart2',
    type: 'discreteBarChart',
    x: 'label',
    y: 'value',
    height: 340,
    margin: {
      left: 38
    },
    color: ['#EA7E7E']
  },
  fetchData: {type:'function', name: 'getData'},
}
```

Notice that all the chart configuration goes inside the settings object. 

**id, type, fetchData and height are mandatory.** 

If the x and y columns on your data already have the names you want, then you don't need to specify the x and y settings. 

**Available settings**

**React NVD3 documentation:** https://github.com/NuCivic/react-nvd3
**NVD3 documentation:** https://nvd3-community.github.io/nvd3/examples/documentation.html

### Choropleth Map


```javascript
{
  header: 'GAChoropleth Test',
  type: 'Choropleth',
  settings: {
    colors:['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'pink','violet', 'darkmagenta'],
    cssPath: '/static/choropleth.css',
    showTooltip: {true},
    domainField: 'rate',
    levels: 9,
    domainLower: 0,
    domainUpper: .15,
    legendHeader: "Per Cent Unemploytment by U.S. County",
    width: 1200,
    height: 600,
    domainKey: 'id',
    dataset: {
      backend: 'csv',
      url: '/data/unemployment.tsv',
      delimiter: '\t'
    },
    mapFormat: 'topojson',
    mapDataUrl: '/data/us.json',
    polygon: 'counties',
    mesh: 'states',
    projection: 'albersUsa',
    showGraticule: true,
  },
  fetchData: {type:'function', name: 'getData'},
},
```

**Available settings**
TODO


### Goal

**React Dashboard** allows you to define goals to accomplish and are measured against the data. Goals be displayed by *increase*, *decrease*, *maintain* or *measure*. 


```javascript
{
  type: 'GAGoal',
  title: '',
  caption: 'number of schools enrollments',
  link: 'http://tootherplace.com',
  icon: 'glyphicon-gbp',
  startDate: '03/24/2016',
  endDate: '04/24/2016',
  startNumber: 0,
  endNumber: 200,
  action: 'increase',
  background: 'white',
  // trackStatus: 'function',
  tolerance: [
    {from: 0, to: 2, label: 'On Track', color: 'green'},
    {from: 2, to: 5, label: 'Needs Improvement', color: 'orange'},
    {from: 5, to: Infinity, label: 'Off Track', color: 'red'},
  ],
  spline: {
    height: 50,
  },
  fetchData: {type:'function', name: 'getData'},
  metric: 'getRandomMetric'
}
```

**Available settings**
* **caption:** caption text using in the component. Only plain text is allowed. 
* **link:** a url to redirect users when they click in the goal.
* **startDate:** date when you start to messure your goal
* **endDate:** date when you needs to reach the goal.
* **startNumber:** amount of units you start with. 
* **endNumber:** amout of units you want to reach.
* **action:** the action you want to accomplish. 

There are 6 possible values:

  -  *increase*: your goal is to increase the number of units. If the number of units are equal or greater than the endNumber then goal is on track.
  
  -  *decrease*: your goal is to decrease the number of units. If the number of units are equal or lower than the endNumber then goal is on track.
   
  - *maintain_above*: this action is very similar to the increase action except  startNumber and endNumber should be set at the same number.
  
  - *maintain_below*: this action is very similar to the decrease action except  startNumber and endNumber should be set at the same number.
  
  - *measure*: in this case you don't want to reach a goal but just display a mesure.
  
* tolerance: allow you to define a tolerance to define the status of your goal. 

Let's take a look at the above example. In that case if your deviation is between 0 and 2 then the *OnTrack* label will be displayed because the first item of tolerance will be selected.

Deviation is computed by projecting the number of units based on the *startDate*, *endDate* and *endNumber* and using a linear function. You can override the *getTracker* and the *trackStatus* functions if this projection doesn't fit with your needs.

* spline: you can choose to additionally show a spline chart below the goal. If you choose to display the goal then you can set an object with the configuration needed to display the spline (e.g.: height).

### Loader

**Loader** allows components to display a loader while they are fetching data. If you create a completely new component (it inherits either from *Component* or *BaseComponent*) then you can use it in this way:


```javascript

class MyComponent extends BaseComponent {
  render(){
    return (
      <Loader isFeching={this.state.isFeching}>

      </Loader>
    );
  }
}
```

As soon as *state.isFetching* is true then all the components inside <Loader> and </Loader> will display.

If you are extending from the *BaseComponent* and using the *fetchData* property to fetch resources then the *isFeching* state is handled for you.

If you aren't using *fetchData* to fetch resources then you need to switch this variable manually.

## Models and Backends

### Models
To fetch remote data you can either use the *fetchData* property, the dataset models, backends or just the *fetch api* standard. We recommend keeping the selection in that order, where *fetchData* is the preferred method and the *fetch api* is the less preffered method.

If you want to use the dataset model then you'll need to do something like this inside the component you are populating:

```javascript

// Import the dataset model from the library
import Dataset from 'react-dashboard/Dataset';

// Instantiate the dataset and configure it by passing the backend configuration.
let dataset = new Dataset({backend: 'csv', url: 'http://example.com/example.csv'});

// Let's set the state to fetching to display a loader and since we already have the dataset object let's save it for future queries.
this.setState({isFeching: true, dataset: dataset});

// Fetch the resource
dataset.fetch().then(() => {
  // Query the dataset for example for pagination purposes
  dataset.query(query).then( (data) => console.log(data) ); //query e.g. {size: 10, from: 0}
});
```

#### Query
Since models were ported from recline the query object keeps the same shape. However you **don't** need to create a QueryState object, you can use plain javascript objects instead.

To see the full list of available options see http://okfnlabs.org/recline/docs/models.html#query

### Backends
There are a few backends available but more are coming. 

#### CSV
This is a port of https://github.com/okfn/csv.js so it keeps the same configuration options.


```javascript
let dataset = new Dataset({backend: 'csv', url: 'http://example.com/example.csv'});
```

**Available settings**
* **data:** is a string in CSV format. This is passed directly to the CSV parser. 
* **url:** a url to an online CSV file that is ajax accessible (note this usually requires either local or on a server that is CORS enabled). The file is then loaded using jQuery.ajax and parsed using the CSV parser (**NB: this requires jQuery**) All options generate similar data and use the memory store outcome. 
* **file:** is an HTML5 file object. This is opened and parsed with the CSV parser.
* **dialect:** hash / dictionary following the same structure as for the parse method below.

#### DKAN
This backend should be used to fetch resources from *dkan*. You can provide either the url pointing to the resource you want to consume or the id + endpoint pair.

```javascript
let conf = {
  url: 'http://demo.getdkan.com/api/3/action/datastore_search?=&resource_id=db114e1f-cf44-4cef-b4a7-b2451b039fb1'
};
let dataset = new Dataset(conf);
```

**Available settings**
* **endpoint:** the base endpoint your dkan api. e.g. `http://demo.getdkan.com/api`
* **id:** the id of the resource. e.g. `db114e1f-cf44-4cef-b4a7-b2451b039fb1`
* **url:** the full url `http://demo.getdkan.com/api/3/action/datastore_search?=&resource_id=db114e1f-cf44-4cef-b4a7-b2451b039fb1` 


## Development and examples

To run examples:
```
$ git clone git@github.com:NuCivic/react-dashboard.git
$ npm install
$ npm start
$ open http://localhost:3000
```

Before commit please run:

```javascript
npm build
```

## Boilerplate
If you don't want to start from scratch you can use the react dashboard boilerplate https://github.com/NuCivic/react-dashboard-boilerplate

It includes a working example with charts, a table, metrics, goals and a choropleth map. It also shows how to fetch data and transform data from remote resources.  


## To-do
- Filter component to allow users filter global dashboard data base on fields.
- Map component to display pins in a map.
- Make it possible to rename columns in tables.
- Make it possible to pass strings instead of functions as tick formaters for charts.
