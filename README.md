React Dashboard
===============
![ScreenCapture example](https://github.com/NuCivic/react-dashboard/raw/master/static/example.gif)
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
There is currently no UI to create **React Dashboards**. Everything is generated from code.

### Why?
We're working on it. Check back soon.

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
Dashboard configuration is stored as a javascript object inside the file *src/settings.js*. It's a hierarchical representation of a dashboard, where components are represented by configuration objects. The *type* parameter determines what type of component will be rendered. The rest of the parameters, including *children*, are passed to the component as props. Use the *Div* component (see below) to create rows and columns (using the bootstrap grid system) in order to compose a dashbaord layout. See _examples/settings.js_ for a complete example.



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

### Overriding base components
Components can be extended to provide custom behavior:

```javascript
import React, { Component } from 'react';
import Registry from '../../src/utils/Registry';
import Chart from '../../src/components/Chart';

export default class CustomChart extends Chart {
  // ... do custom stuff here
}

// make sure to register the component!!
Registry.set('GAChart', CustomChart);
```


Javascript alllows you to override any method of a parent class, but...

** Functions commonly overridden in custom components: **
* **fetchData:** Provide logic for gatherin data
* **onData:** Preprocess the fetched data, when available
* **onResize:** Add a post-hook to a resize event. (this.state.componentWidth should always be available, and is updated after resize, but before onResize is called)

### Shared settings
Some settings are shared across all the components. This is the complete list of shared settings:

**Available settings**
* **fetchData:** define the fetch data strategy used in the current component.
* **queryObj:** the query to be used after data fetching. For example this would allow you to filter the raw dataset for pagination.

### Extending components
Components can and should be extended to  be extended

### Div
The *Div* component allows you to organize the dashboard into divs. Use the [bootstrap grid system](https://getbootstrap.com/examples/grid/) to create rows and columns. Elements which are contained within divs should be defined within the *children* array of the div component definition in *settings.js*. The dashboard will render the components inside of your div! See _exmaples/settings.js_ for a complete example.

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

#### Domain Data
Domain data provides the statistical data necessary to calculate the levels of the choropleth. As with all components, this can be provided by the *globalData* parameter, or fetched via a custom function or using any of the available backends.

#### Configuration object shape
```
{
  type: 'Choropleth',
  format: 'geojson',
  fetchData: {
    url: './data/apollo-parsed-1737-325_0.csv',
    type: 'backend',
    backend: 'csv',
    // delimiter: '\t'
  },
  id: 'Choropleth',
  dataKeyField: 'Zone',
  dataValueField: 'Total Observers',
  geometryKeyField: 'name',
  geometry: './data/zones.geojson', // topojson or geojson
  projection: 'equirectangular', // https://github.com/d3/d3/wiki/Geo-Projections
  scaleDenominator: .7,
  borderColor: '#000000',
  noDataColor: '#F3F3F3',
  dataClassification: 'equidistant',
  legend: {
    // startColor: 'red',
    // endColor: 'yellow',          
    classesCount: 5,
    palleteKey: 'GnBu',
    pallete: ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'],
    domainStartValue: '',
    domainEndValue: '',
  }
  // customMin: '',
  // customMax: '',
  // topologyObject: 'counties'
}
```
**Settings**
* **format**: [_string_] type of geometry file to be used. Actually geojson and topojson geometries are supported.
* **geometry:**: [_string_] path to either a geojson or topojson file.
* **geometryKeyField** (geojson): [_string_] name of the property in the geometry file that will be used to join the domain data with the proper polygon.
* **dataKeyField**: [_string_] field in the domain data that will be used to join join the domain data with the proper polygon.
* **dataValueField**: [_string_] field in the domain data to calculate the levels of the choropleth.
* **projection**: [_string_] the projection to draw the geometry. Available projections can be found at https://github.com/d3/d3/wiki/Geo-Projections. 
* **scaleDenominator**: [__number__] a number to scale the map
* **borderColor**: [__string__] border color for each shape in the geometry
* **noDataColor**: [__string__] shape color when no data is available in a given polygon.
* **startColor(linear scale)**: [__string__] color mapped to the lowest value in the domain data.
* **endColor(linear scale)**: [__string__] color mapped to the highest value in the domain data.
* **dataClassification**: [__string__] kind of scale to be used for data classification. Linear and Equidistant scales are supported.

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

### Multi Component
The **Multi Component** provides a starting point for developing component rendering schemes that depend on logic to determine which components to render. The Multi component expects the following settings:
* **elements** a keyed array that defines a set of elements. of the format:
```javascript
    elements:
        a: [
            {//... a component},
            {//... another component},
            {//... etc}
        ],
        b: [
            {//... just one component} // still use an array to define a single component
        ]
```
Child components should contain a 'key' value which is unique, and allows React to keep track of lists of children.
* **initialSelect** the key value to load as the initial set of elements (for example, given the above elements array 'a')

In addition to these settings, the implementation of the Multi component should define the following methods:

**render** This will render the component. The render method can define a UX element to control this method can call `this.renderChildren()` in order to render the children 
**multiComponentListener** This method is responsible for listening for a trigger to update the multicomponent. This can be an onChange handler that is defined on an input element in the render function, a global even which is triggered by an action, or an as-yet-unforseen method of updating the app-state. The only rule is the the multiComponentListener method needs to be reliably triggered, somehow, and it needs to set the state.elements array to the an array of valid dashboard components.
**componentWillMount** By default, this function will set the initial state.elements array to the value assigned to *initialSelect* in the components settings. This, however, can be overridden to provide custom logic to determine the initial state of the multi component.
**NOTE** This sounds more confing than it is. Look at the `/examples/GAMultiSelectComponent.js` and `src/compenents/Multi.js` source code to understand more clearly what is going.
**NOTE2** Stay tuned for more out of the box functionality and better documentation!

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

#### Inline
A backend to provide and array of data.

```javascript
let dataset = new Dataset({
  backend: 'inline', 
  records: [{x: 1, y:2}, {x:3, y:20}]
});
```
**Available settings**
* **records:** an array with the data you want to use.

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
