# Autocomplete Component

Autocomplete uses the *react select component* https://github.com/JedWatson/react-select. As a result all the *react select* configurations can be passed in the element configuration.

Usually you won't need to extend this component. Autocomplete has standard behavior and is highly configurable.


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
* **options:** an array with options (e.g.: [{ value: 'one', label: 'One' }])
