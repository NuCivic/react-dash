# Metric Component
```eval_rst
.. image:: ../../_static/components/Metric_0.4.png
```
**Metrics** are intended to display a single value to the end-user. 

```javascript
{
  type:'Metric',
  cardStyle: 'metric',
  iconClass: 'fa fa-clock',
  background: '#9F3E69',
  data: ['Provided Value'],
  caption: 'New Users',
}
```

**Available settings**
* **background:** the background color to be used for this metric. 
* **caption:** a description to be displayed 
* **cardStyle:** REQUIRED: must be 'metric'
* **iconClass:** [font-awesome icon class](http://fontawesome.io/icons/)
* **data:** a value for the metric. It should be a scalar value contained within an array
* **fetchData:** fetch datat callback 
* **dataHandlers:** an array containing dataHandler object(s)
* **options:** an array with options (e.g.: [{ value: 'one', label: 'One' }])
