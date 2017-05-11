Data Handling
=============
Dashboard Data Settings
--------------------
Dashboard data is configured using the *dataResources* prop.  The *dataResources* keys (also called *dataKeys*) refer to a settings object which is used by `getDashboardData()` to fetch data and populate the dashboard.

.. literalinclude:: ../../examples/settings.js

getDashbaordData()
------------------
Each dashboard implementation should include a `getDashboardData()` with the following responsibility:
    * fetch data based on `props.dataResources` 
    * set data to dashboard using `this.setState({data: fetchedData})`
    * set isFetching to false using `this.setState({isFetching: false})`

Dashboard Data Format
-----------
Dashboard data should be formated as follows:

.. code-block:: javascript
    data: {
        dataKey1: { //... },
        dataKey2: { //... }
        // ...
    }

Each dataKey should represent a discreet data set. This division of data into seperate indexes allows us to target these indexes in our dataHandlers (@@link), filters (@@link), etc.

Component Data
--------------
Data is passed as a prop to components. Data should be formatted as an array, but the specific data format is determined by the component. 

Each component can define data as an object, OR provide dataHandlers (see dataHandlers (@@LINK)) which return a data object.

See Components (@@LINK) for more information about data format required by each component type.

    * Dashboard calls `getDashboard()` method - it is up to you, the implementer, to define this method.
    * When Dashboard renders each component it looks to see if there are:
        * dataHandlers_ set. If so, it uses the output of the dataHandlers as the data attribute of the component (props.data
        * data_ set. Data array is passed to component.

.. toctree::
   :maxdepth: 1
   data
   datahandlers
