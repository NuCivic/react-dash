# Metric Component
```eval_rst
.. image:: ../../_static/components/Metric_0.4.png
```
**Metrics** are intended to display a computed single value to the end-user. The basic class **Metrics** should be extended in order to override the base component's _getMetric_ function. 

Your custom _getMetric_ function can compute metrics derived from the *globalData* prop.
As with all components you can override the *fetchData* property to fecth external data.

```javascript
{
  type:'GAMetric',
  background: '#9F3E69',
  metric: 'getRandomMetric',
  caption: 'New Users',
  fetchData: {type: 'function', name: 'externalData'}
}
```

**Available settings**
* **background:** the background color to be used for this metric. 
* **metric:** a function defined in the subclass component that retrives the metric number. 
* **caption:** a description to be displayed 
* **options:** an array with options (e.g.: [{ value: 'one', label: 'One' }])
