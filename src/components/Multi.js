import React, { Component } from 'react';
import Registry from '../utils/Registry';

export default class Multi extends Component {
  construct(props) {
    super(props);
  }

  render() {
    console.log('mR', this);
    let v = <div class="multi-container">
              <select onChange={this.listener.bind(this)}>
                <option val="a">Option A</option>
                <option val="b">Option B</option>
              </select>
     
     if (this.state.elements.length > 0){
        v += this.elements.map((element) => {
          return React.createElement(Registry.get(element.type), element);
        });
			  </div> 
     } else {
        v += </div>
     }

     console.log('v',v);
     return v;
  }

  /*
	 * Listener should listen for a global event or an event on the DOM 
   * and render its child component(s)
   * @@TODO this should go into a child component in the examples folder:
   */
  listener(e) {
    console.log('mL', e.target.value);
    this.setState({elements: this.props.elements[e.target.value]});
  }
}

Registry.set('Multi', Text);
