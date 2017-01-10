# Overview

The best way to start a react-dash project is to install the boilerplate module. See [Getting Started](../intro.md).

Once the project is installed, you will have a directory structure that looks something like this:

```
package.json
node_modules/
webpack.config
index.html
dist/
  bundle.js
  bundle.css
src/
 app.js
 settings.js
 customDatahandlers.js
 static/
   custom.css
   your.img
```

The most important files here are in the `src/` directory. Not counting static files (image resources, css, etc), you should only need to modify the following files:

### [app.js](app.js.md)
This file contains the boilerplate code to load a dashboard component into the root element of your index.html file. It is possible, but not necessary, to do initial preparatory work here, for instance fetching dashboard data (see [Initializeing Dashboard Data](@@LINK))

Currently, there are two formats avialable for defining dashboards: 



#### JSX
You can define a dashboard using familiar JSX syntax. Following is a complete example of a simple dashboard defined in JSX:

```eval_rst
.. literalinclude:: ../../examples/jsx_example.js 
```

#### Javascript Settings object [settings.js](settings.js.md) 
In many cases it is useful to define dashboard configuration in JSON - allowing for database storage, programmatic creation, etc. Here is the same Dashboard defined as a Javascript object. 

```eval_rst
.. literalinclude:: ../../examples/js_example.js 
```

### [customDatahandlers.js](customDatahandlers.js.md)
A library of functions that we use to preprocess data.
