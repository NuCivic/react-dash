# Multi Component
The **Multi Component** provides a starting point for developing component rendering schemes that depend on logic to determine which components to render. The Multi component expects the following settings:
* **elements** a keyed array that defines a set of elements. of the format:
```javascript
    elements:
        a: [
            {//... a component},
            {//... another component},
            {//... etc}
        ],
        b: [
            {//... just one component} // still use an array to define a single component
        ]
```
Child components should contain a 'key' value which is unique, and allows React to keep track of lists of children.
* **initialSelect** the key value to load as the initial set of elements (for example, given the above elements array 'a')

In addition to these settings, the implementation of the Multi component should define the following methods:

**render** This will render the component. The render method can define a UX element to control this method can call `this.renderChildren()` in order to render the children 
**multiComponentListener** This method is responsible for listening for a trigger to update the multicomponent. This can be an onChange handler that is defined on an input element in the render function, a global even which is triggered by an action, or an as-yet-unforseen method of updating the app-state. The only rule is the the multiComponentListener method needs to be reliably triggered, somehow, and it needs to set the state.elements array to the an array of valid dashboard components.
**componentWillMount** By default, this function will set the initial state.elements array to the value assigned to *initialSelect* in the components settings. This, however, can be overridden to provide custom logic to determine the initial state of the multi component.
**NOTE** This sounds more confing than it is. Look at the `/examples/GAMultiSelectComponent.js` and `src/compenents/Multi.js` source code to understand more clearly what is going.
**NOTE2** Stay tuned for more out of the box functionality and better documentation!