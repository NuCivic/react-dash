import React from 'react';
import ReactDOM from 'react-dom';
import { MyDash } from './myDash.js';

// All the app.js file needs to do is inject our Dashboard into the container element of our page
document.addEventListener('DOMContentLoaded', function(event) {
    ReactDOM.render(<MyDash/>, document.getElementById('root'));
});
