# Getting Started

* Make sure that you have npm installed on your system
* Set up an npm project

```
npm init
npm install react-dash
npm run start
```

## Building a Project using JSX syntax
You can build a dash using JSX syntax by loading the react-dash Dashboard and other components, as follows. This is more or less standard react stuff, and should make sense if you are familiar with react.

To run the example type `npm run jsx-example`

The application code:
```eval_rst
.. literalinclude:: ../examples/jsx_static_example/app.js 
    :start-after: start read-the-docs example
    :end-before:  end read-the-docs example
```

## Building a project using a settings object
React Dash also supports a javascript syntax which allows you to build your application using JSON or javascript objects. The settings are translated to props by the component. 

To run the example, type `npm run js-example`

The application:
```eval_rst
.. literalinclude:: ../examples/js_static_example/app.js 
    :start-after: start read-the-docs example
    :end-before:  end read-the-docs example
```

And the settings:
```eval_rst
.. literalinclude:: ../examples/js_static_example/settings.js 
```

## Building a project in DKAN
[DKAN](http://demo.getdkan.com/) is an open data platform implemented in Drupal. React Dash provides a dkan integration which takes advantage of the DKAN Datastore API and provides a Drupal module for easily building and embedding data visualization dashboards in DKAN. Visit the [DKAN Dash](https://github.com/NuCivic/dkan_dash) page for more. 

## Keep it Moving
### Wiring up the Data
The example application at `examples/app.js` shows a working example of an application using the [CSV backend](development/backends/csv.md) to parse a data file, as well as an example of how to implement [filters](development/filters.md).

## Further Reading
Take a look at our [Developer's Guide](development/index.html) for next steps to customize your dash!
