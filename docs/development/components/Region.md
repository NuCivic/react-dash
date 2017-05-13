# Region

The region is rendered inside of a div, and can be given classes to hep organize the dashboard into the responsive layout. For example assigning `className: 'row'`

## Required Props
* **children** An array containing objects which define components to be rendered inside of the region

## Accordion rendering
`accordion: true`
If the **accordion** prop is set to TRUE, each of the region's children will be rendered inside of an accordion. By default, the first accordion item will be open. Children shold have **dataTrigger** prop, a string which will be rendered inside of the accordion header. Clicking on the dataTrigger element will cause that secction of the accordion to open.

## multi
`multi: true`
Regions can be defined as "multi" regions by adding the prop `multi: true` to the region. The **elements** prop replaces the **children** props in "multi" regions. **elements** is an object where each of the object's keys refers to an array of children:

```javascript
elements: {
    states: [
        // ...
    ],
    counties: [
        // ...
    ]
}
```

Additionally, the multi region defines a [dataHandler](../dataHandlers) which returns a key value corresponding to one of the keys in the **elements** based on dashboard state. In this way, a Dashboard region can determine which components to render depending on dashboard state, applied filters, data, etc.
