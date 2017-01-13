# Overview
Currently, there are two formats avialable for defining dashboards: 

## JSX
You can define a dashboard using familiar JSX syntax. Following is a complete example of a simple dashboard defined in JSX:

`npm run jsx-example` will load the following dashboard:

```eval_rst
.. literalinclude:: ../../examples/jsx_static_example/app.js 
```

## Javascript Settings object 
In many cases it iis useful to define dashboard configuration in JSON - allowing for database storage, programmatic creation, etc. Here is the above Dashboard defined as a Javascript object.

`npm run js-example` will load the following dashboard configuration at `localhost:3000`:

```eval_rst
.. literalinclude:: ../../examples/js_static_example/app.js 
```

## Complete Dashboard Application
The app at `/examples/app.js` runs an example of a more robust application with datahandling, filtering, etc.

`npm run start` will from the react-dash repository will run the application.

## Boilerplate project
The boilerplate module includes the above application in a complete development environment suitable for doing dashbaord development.

`git clone https://github.com/NuCivic/react-dash-boilerplate.git`
`cd react-dash-boilerplate`
`npm install`
`npm run init`
`npm run start`

This will spin up the example application, and you can use it as a starting point for developing your own app.
