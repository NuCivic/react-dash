# Creating custom components

## Extending components
Components can be extended to provide custom behavior:

```javascript
import React, { Component } from 'react';
import Registry from '../../src/utils/Registry';
import Chart from '../../src/components/Chart';

export default class CustomChart extends Chart {
  // ... do custom stuff here
}

// make sure to register the component!!
Registry.set('GAChart', CustomChart);
```

Javascript alllows you to override any method of a parent class, but...

** Functions commonly overridden in custom components: **
* **fetchData:** Provide logic for gatherin data
* **onData:** Preprocess the fetched data, when available
* **onResize:** Add a post-hook to a resize event. (this.state.componentWidth should always be available, and is updated after resize, but before onResize is called)