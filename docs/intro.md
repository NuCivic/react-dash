# Getting Started

* Make sure that you have npm installed on your system

## Boilerplate project
The best way to start a react-dash project is to use the [react-dash-boilerplate project](https://github.com/NuCivic/react-dash-boilerplate).

```
git clone git@github.com:NuCivic/react-dash-boilerplate.git
cd react-dash-boilerplate
npm install
npm run setup
npm run dev
```
visit localhost:5000

From here, you can start to mess with the files in /src/
Delete the .git folder and create a new repository for your project.
Build stuff!

## Building a project in DKAN
[DKAN](http://demo.getdkan.com/) is an open data platform implemented in Drupal. React Dash provides a dkan integration which takes advantage of the DKAN Datastore API and provides a Drupal module for easily building and embedding data visualization dashboards in DKAN. Visit the [DKAN Dash](https://github.com/NuCivic/dkan_dash) page for more. 

## Keep it Moving
### Wiring up the Data
The example application at `examples/app.js` shows a working example of an application using the [CSV backend](development/backends/csv.md) to parse a data file, as well as an example of how to implement [filters](development/filters.md).

## Further Reading
Take a look at our [Developer's Guide](development/index.rst) for next steps to customize your dash!
