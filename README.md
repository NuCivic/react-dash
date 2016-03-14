<React Dashboard>
===============

## What's <React Dashboard>
We created this library to speed up dashboards creation with the flexibility only code could give.

## Install
```
npm install <React Dashboard> (--save)
```

## Require
Once you have installed this library you need to require it and create an entry point:

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

## Dashboard are composed of two main things: configuration and context

### Configuration 

The configuration is a plain javascript object with all the settings needed to create a dashboard. It looks like this:

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

### Contexts
Contexts holds the implementation of methods referenced from the store. 

Technically they are javascript classes and it needs to be passed to the dashboard component during the instantiation.

To create a new context you need to extend the base class context by adding all the methods you need and then pass it to the dashboard during the instantiation.

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

```javascript
export default class App extends Component {
  render() {
    return (
      <div>
        <Dashboard context={new AppContext(this)} ... />
      </div>
    );
  }
}
```


## Layouts
Even when <React Dashboard> provides some basic layout classes by default you probably would like to create your own layouts. 

In order to achieve this you need to extend the base class Layout:

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

Layouts are composed of regions. You can arbitrary create any number of regions by calling the renderRegion method with the region object: 

Note that we are registering the component using the Registry set method. This is a requirement to make Components available inside layouts. Every time you create a new component you'll need to register it.

```javascript
{this.renderRegion(this.props.regions.myCustomRegion)}
```

## Function references
Since we don't want to store function references because security concerns then all the function calls are stored using this signature:

```
{
  type: 'function',
  name: 'nameOfMethod'
  args: []
}
```

Later you can call this function references from your components by using the execute function available in all the conexts which extends from the base Context class:

```
this.props.context.execute({
  type: 'function',
  name: 'nameOfMethod'
  args: []
});
```

## Built-in Layout

## Components
### Built-in Components
#### Autocomplete
#### Card
#### Dashboard
#### Layout
#### Metric
#### Table
#### Text

## Development
```
$ git clone git@github.com:NuCivic/react-dashboard.git
$ npm install
$ bower install
$ npm start
```
