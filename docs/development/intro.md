# Overview

The best way to start a react-dash project is to install the boilerplate module. See (Getting Started)[@@LINK].

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

### [app.js](X@@LINK)
This file contains the boilerplate code to load a dashboard component into the root element of your index.html file. It is possible, but not necessary, to do initial preparatory work here, for instance fetching dashboard data (see [Initializeing Dashboard Data](@@LINK))


### [settings.js](@@LINK) 
This file contains a javascript object with a declarative configuration for the dashboard. Here we define the dashboard components and settings.

### [customDatahandlers.js](@@LINK)
A library of functions that we use to preprocess data.
