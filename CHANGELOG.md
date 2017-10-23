0.7.2 2017-10-23
----------------
- Pin React version to v.15.6.2 pending a v.2.0.0 release which should support React v.16.
- Update broken links to sample data in settings.js. Map & Chart example was linking to a data source in Dropbox. Updated to link to data sources within the repo.
- Add Keys to sample data to fix console.log errors.
- Add a new Link feature to the Highlight component.

0.7.1 2017-08-03
----------------
- Update the the Highlight Component
- Fixe default filters that were not being applied.
- Bugfix for failing routing.

0.6.x 2017-4-1
------
- Add cardClasses to components.
- Add regions to Card component:
  * header
  * subheader
  * topmatter
  * subheader2
  * topmatter2
  * footerHeader
  * footerSubheader
  * bottommatter
  * footerSubheader2
  * bottommatter2
Card regions can be set as props on the wrapped element, and as a consequence can be set via stateHandlers, allowing us to change the appearance of the card based on component state for wrapped elements.
- Add stateHandlers
State handlers fire on component mount and state update. They should be passed an `attr` attribute which tells the stateHandler which component prop to update. If the handler updates a cardVar (card region above or cardClasses narray, etc, the properties will be passed to the wrapping Card element for the wrapped component)
- Allow accordion regions to open/close with a click.
- Add accessible headers for card elements.
- Add accessible filter labels for the autocomplete component.
- Add support for props.dashWrapperClass in dashboard component
- Add support for props.isLink in highlight component

0.6.x 2017-3-7-2017 
-------------------
- Add stateHandlers
- Move Card wrapping to render method of 'Card-able' components. This allows
us to pass Card variables to card based on component state - so we can do
dynamic rendering based on conditional logic capture in stateHandlers
- add cardVariables to component state. These can be derived from props, or
can be generated computationally using stateHandlers. Also we could use this
mechanism in component code to pass component state or config  to the wrapping
Card

0.6.x 2017-2-27-2017 
--------------------
- Add Highlight component which provides a very basic profile type list

0.5.x 2017-2-23-2017
--------------------
- Dashboard.props.isFetching is set to true during dashboard instantiation and
should reset to false in Dashboard.getDashboardData() once all dashboard data
is loaded. 

0.5.x 2017-1-30-2017
--------------------
- Add Multicheckbox component - this works widd the onAction ->
AUTOCOMPLETE_CHANGE event. See /examples/settings.js for configuration
options.
- Filter Routing - EXPERIMENTAL - this can be disabed with
disableFilterRouting in settings

0.5.1 2017-1-10
---------------
- Add `npm run js-example` -- runs simple js config'd app from
/examples/js_static_example
- Add `npm run jsx-example` -- runs simple jsx flavor app from
/examples/jsx_static_example
- Documentation updates
- Add `disabledBy` prop to filters - allows other filters to disable a filter
when present as appliedFilter
- Chart component props.settings.tickFormat is d3 formatter string which is
turned into a function by the Chart component

0.5.0 2016-08-31
----------------
- Flux-ISH data flow in example app
Data is fetched, processed and updated at the App implementation level
(@@DASHBOARD LEVEL?). 
Only Dashboard level actions can change state.
Dashboard uses component settings from settings.js and dataHandlers (read:
reducers) to calculate component data. 
All components are passed static data at render.
For a component to update data / application state it must trigger an action
at the dashboard / app level
- Regions
Regions will render rows, allowing for easy responsive grid rendering.
- Multi Regions
Regions can now be define 'multi: true' in props, in which case the named
dataHandler will be called. The data handler should return a string which will
serve as a key, this key is used to select which sub-region to render from the
multi-region. Replaces Multi Component.
- data abstraction - dataKeys
We add an abstraction for dataKeys - a dataKey represents an individual
app-level data source, which contains query objects
- Filters
We have a common filter settings definition that includes the field to filter
and a willFilter array to determine which dataKey's data we are filtering...
see full documentation @@LINK 
Added BaseFilter component 
Move event handling to base class to unify filter implementations
Add example of app filtering in example app
- Added Checkbox Filter
- Removed Multi Component
- Add datahandlers to common library:
    - getXYBYQueryDataWhere
    - whiteListValues
    - inspect
- update datahandlers:
    - common.getXYBYQueryData 
    - add dashboardData.dataKey level of data abstraction (see
above)
    - common.groupByRange - remove check for isPieChart - use NVD3 handler instead
    - common.rekeySeries - return values array as array [output]

0.4.x 2016-08-31 
----------------
- Update data handling
- Add data table component
    - Rename Table component to DataTable to avoid namespace collisions
    - Add hideFilterHeader and hideControls props to component
    - ** NOTE ** DataTable filters rely on Dataset.query which is
    - ** NOTE ** provided by Backends (csv, google docs etc)
    - ** NOTE ** Will not-currently work with non-Datasrt dat
- Check for cardType in props before rendering element as Card
- Add multi component
- style prop on card elements rendered on card div - uses form { boderBottom:
 "1em" }
- Update Filter Handling for autocomplete component
- Move onAction to Dashboard component and include `field` value 
(defined in settings on Autocomplete component)
- Add appliedFilters to Dashboard state and pass to children in props
- Make appliedFiters avaiable in dataHandlers

0.3.7 2016-08-23
----------------
- pass globalData as props to all components (BUG FIX)

0.3.6 2016-08-23
----------------

0.3.5 2016-08-23
----------------

0.3.4 2016-08-23
----------------
- Remove Multi-component from /examples project since it is breaking
react-dashboard-boilerplate automated install

2016-07-11 ** 0.3.0
-------------------
- Add react-router support

2016-07-06 ** 0.2.1
-------------------
- Add ReactSelect element to component registry
- Add Registry support for native react elements
- Document data handlers

2016-07-05 ** 0.2.0
-------------------
- Add Changelog!
