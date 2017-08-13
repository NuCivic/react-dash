Overview
--------

Dashboard Data Settings
=============
Dashboard data is configured using the *dataResources* prop.  The *dataResources* keys (also called *dataKeys*) refer to a settings object which is used by `getDashboardData()` to fetch data and populate the dashboard.

.. literalinclude:: ../../examples/settings.js

getDashboardData()
=============
Each dashboard implementation should include a `getDashboardData()` with the following responsibility:
    * fetch data based on `props.dataResources` 
    * set data to dashboard using `this.setState({data: fetchedData})`
    * set isFetching to false using `this.setState({isFetching: false})`

Dashboard Data Format
===============
Dashboard data should be formated as follows:

.. code-block:: javascript

    data: {
        dataKey1: { //... },
        dataKey2: { //... }
        // ...
    }

Each dataKey should represent a discreet data set. This division of data into seperate indexes allows us to target these indexes in our dataHandlers :doc:`dataHandlers <datahandlers>`, :doc:`filters<../filters>`, etc.

Component Data
============
Data is passed as a prop to components. Data should be formatted as an array, but the specific data format is determined by the component. 

Each component can define data as an object, OR provide :doc:`dataHandlers <datahandlers>` which return a data object.

See :doc:`Components <../components/index>` for more information about data format required by each component type.

