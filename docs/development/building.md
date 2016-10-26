# Building the Dashboard
When development is done, you need to build the dashboard.

## standalone project
Standalone allows you to ouput a javascript bundle that you can embed in any website.
If you are using the boilerplate project, run `npm run build_standalone`. If you are building from the example folder of the react-dash library run `npm run build`. It is also possible to provide an additional webpack configuration file that suits your development or production needs. Consult the [webpack documentation](https://webpack.github.io/docs/).

## dkan project
From inside of the `react_dashboard/app` directory run `npm run build_dkan`. This will output the compiled javascript and css bundles in the proper location for the react_dashboard module to load them. See the [react_dashboard docs](https://github.com/NuCivic/react_dashboard) for greater detail.

## additional integrations
Interested in integrating another platform? Written an integration? File an [issue](https://github.com/NuCivic/react_dashboard/issues)
