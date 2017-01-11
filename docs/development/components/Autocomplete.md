# Autocomplete Component

Autocomplete uses the *react select component* https://github.com/JedWatson/react-select. As a result all the *react select* configurations can be passed in the element configuration.

```javascript     
{
  type: 'Autocomplete',
  name: 'some-name',
  multi: true,
  url: 'http://localhost:3004/options?q={{keyword}}',
},
```

**Available settings**
* **url:** url to fetch the options base on the keyword you typed in the input.
* **multi:** you can enable multi-value selection by setting multi to true. 
* **name:** an arbitrary name.
* **data:** an array with options (e.g.: [{ value: 'one', label: 'One' }])
* **dataHandlers:** Alternately, you can use a data handler to return the component data - this is useful if your autocomplete options are derived from dashbaord data
