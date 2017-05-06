# Overview
Currently, there are two formats avialable for defining dashboards: 

## JSX
You can define a dashboard using familiar JSX syntax. Following is a complete example of a simple dashboard defined in JSX:

`npm run jsx-example` will load the following dashboard:

```eval_rst
.. literalinclude:: ../../examples/jsx_static_example/app.js 
```

## Javascript Settings object 
In many cases it is useful to define dashboard configuration in JSON - allowing for database storage, programmatic creation, etc. Here is the above Dashboard defined as a Javascript object.

`npm run js-example` will load the following dashboard configuration at `localhost:3000`:

```eval_rst
.. literalinclude:: ../../examples/js_static_example/app.js 
```

## Complete Dashboard Application
The app at `/examples/app.js` runs an example of a more robust application with datahandling, filtering, etc.

`npm run start` will from the react-dash repository will run the application.
