# Filter components

## Filters
Filters allow data to be filtered based on user input, application state, or other custom logic. Filters use dom events and custom data handlers to provide filtered data.

### Component-level filters
Filters can be used to allow user input which controls the data at the component level.
Filters use dataHandlers, along with user input, to determine how to filter component data.
Filters are configured as follows

### Filter Paramaters
Filter paramaters are serialized to the url, allowing the dashboard to be loaded with a set of filters already applied.
The url query string is serialized according to the following scheme:

`http://yoursite.com/dashboard/cid1=key1_val1&cid_1=key1_val2&cid2=key2_val3`

```javascript
{
  cid1: {
    key1 : ['val1', 'val2']
  },
  cid2: {
    key2 : val2
  }
}
```

Components recieve their `ownParams` as props. So for copoment with _cid1_:

`component.props.ownParams = { key1: ['val1', 'val2'] }`

```javascript
//@@TODO
```

### Dashboard-level filters
@@TODO
Autocomplete / Actions / data handlers

## Theming
### Dashboard-level theming
The **React Dash** comes with default styles, but you can also customize them by importing a stylesheet. 

```javascript
// file: entry point 
// standalone.js or dkan.js
import 'stylesheets/custom.css'
```

Currently you can use either a *css* or a *sass* file. You can also add import sentences inside to split the files. It's good to have a separate stylesheet for each component you are overriding. 

### Cards
@@TODO clarify
If a *cardStyle* property is specified, the component will be rendered inside a car div.

### Componentlevel theming
Components can take a style object as follows:

```javascript
style: {backgroundColor: 'red', fontSize: '1em', margin: '1em'}
```
