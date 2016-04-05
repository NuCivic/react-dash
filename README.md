<React Dashboard>
===============

## What's <React Dashboard>
We created this library to speed up dashboard creation with the flexibility only code could give.

## Install
```
npm install <React Dashboard> (--save)
```

## Create App file
Create an App.js file as an entry point to the application:

```javascript
import React, { Component } from 'react';
import {Dashboard, Geary, utils} from 'react-dashboard/ReactDashboard';
import Context from './Context';
import Layout from './Layout';

export default class App extends Component {
  render() {
    return (
      let store = {};
      <div>
        <Dashboard context={new Context(this)} sharedState={this.state} {...store} layout={Layout}/>
      </div>
    );
  }
}

```
## Configuration 
Create a file called *store.js* that contains the following configuration object:
```javascript
var configuration = {
  title: 'Dashboard title',
  layout: 'layout', // Layout used to render this dashboard
  regions: { // Regions should be rendered inside the layout.
    top: [
      {
        type: 'Autocomplete',
        multi: true,
        url: 'http://localhost:3004/options?q={{keyword}}',
        onChange: {
          type: 'function',
          name: 'onAutocompleteChange' // This function should be defined in the context
        }
      },
      {
        type:'Metric',
        cardStyle: 'metric',
        background: '#9F3E69',  // Properties will be passed to the component
        number: {
          type: 'function',
          name: 'getRandomMetric'
        },
        caption: 'New Users',
      }
    ],
    bottom:[...moreelements],
    ...more regions
  }
}
```
(See Components, below, for how to configure individual components).
## Contexts
_Contexts_ are javascript classes that contain method implementations for handling data and other actions. 

Create a new _context_ by extending the _context_ base class. You can add methods to the new context.
```javascript
import Context from 'react-dashboard/Context';

export default class AppContext extends Context {
  constructor(component) {
    super(component);
  }
  onAutocompleteChange(value) {
    CSV.fetch('http://example.com/data/' + value ).then((data) => {
      this.setState({data: data});
    });
  }
}
```
Context methods will be invoked in components once they have been defined in _store.js_ 
```javascript
      {
        type: 'Autocomplete',
        name: 'some-name',
        multi: true,
        url: 'http://localhost:3004/options?q={{keyword}}',
        onChange: {
          type: 'function',
          name: 'onAutocompleteChange'
        },
        cardStyle: 'none'
      },
```


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

## Context Functions
Context functions are functions which are stored in a context object. 
Their primary use is as _data handlers_ to fetch and process data, and as _callback functions_ for handling actions triggered by your components.

A _context function_ can be added to the _context_ like this:

```javascript
  //@@ TODO Snippet for adding context function
```
They can be accessed within your component's configuration as follows:

```
{
  type: 'function',
  name: 'nameOfMethod'
  args: []
}
```

### Data handlers
Data handlers are functions used for instantiating data and preprocessing data for your components.


### Callback functions
The function is called from within your component by using the _execute_ function available in all the conexts which extend from the base Context class:

```
this.props.context.execute({
  type: 'function',
  name: 'nameOfMethod'
  args: []
});
```

## Components
### Built-in Components
#### Autocomplete
#### Card
#### Dashboard
#### Layout
#### Metric
#### Table
#### Choropleth Map
##### COLORS
http://colorbrewer2.org/
#### Text
### Mixins
### Extending base components
Components can extend available _Mixins_ in order to inherit specific functionality.
```javascript

```
####fetchData
The fetchData mixin provides methods for fetching data via _Data Handlers_. Data Handlers return either a _Promise_ or data. Once the _Data Handler_ has  returned, the _fetchData_ mixin calls _setState_ on the component which triggers a re-render.  

## Development
```
$ git clone git@github.com:NuCivic/react-dashboard.git
$ npm install
$ bower install
$ npm start
```

