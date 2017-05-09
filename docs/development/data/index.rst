Data Handling
=============
React-dash can be instantiated without any data backends, data pre-processing, etc. Components expect data to be passed as an array (see Data Format, below). You can implement the react-dash as a view-layer of an application that outputs component data in the required format. The dashboard also provides a basic framework for fetching and processing data.

Overview
--------
The basic data pipeline looks something like this:
    * Dashboard is instantiated with `state.fetching = true`
    * Dashboard calls `getDashboard()` method - it is up to you, the implementer, to define this method.
    * When Dashboard renders each component it looks to see if there are:
        * dataHandlers_ set. If so, it uses the output of the dataHandlers as the data attribute of the component (props.data
        * data_ set. Data array is passed to component.

.. toctree::
   :maxdepth: 1

   data
   datahandlers
   format
   NVD3
