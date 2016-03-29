console.log('chp');
/**
 * Choropleth Element for React-Dashboard
 * Author Paul Walker (https://github.com/starsinmypockets)
 *
 * Based on the following projects:
 *
 * React D3 Map Choropleth (https://github.com/react-d3/react-d3-map-choropleth)
 * Apache 2.0 License
 *
 * Mike Bostock's Choropleth (https://github.com/react-d3/react-d3-map-choropleth for documentation)
 * GNU/GPL License https://opensource.org/licenses/GPL-3.0
 *
 **/

import React, { Component } from 'react';
import Registry from '../Registry';
import * as MapChoroplethModule from 'react-d3-map-choropleth';
import {FetchData} from './FetchData';
import topodata from 'json!../../examples/data/us.json';
import domainData from 'dsv?delimiter=\t!../../examples/data/unemployment.tsv';

let MapChoropleth = MapChoroplethModule.MapChoropleth;

// @@TODO - we should baseclass the css functions
// Whack some css into the page
function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

// @@TODO - we should baseclass the css functions
// Fetch css
function fetchStyleSheet(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        return res.text();
      })
      .then(css => {
        resolve(css);  
      })
      .catch(e => {
        reject(e);
      });
  });
}

// Dictionary of functions to pass to MapChoropleth 
// Override these functions to generate custom data for your choropleth
const choroplethFunctionDict = {
  tooltipContent: function (d) {
    return {rate: d.properties[d.id]};
  },

  domainValue: function (d) {
    return d[this.props.settings.domainValue];
  },
  
  domainKey: function (d) {
    return d[this.props.settings.domainKey]; 
  },
  
  mapKey: function (d) {
    return +d.rate;
  }
}

class Choropleth extends Component {
  constructor(props){
		super(props);
    this.levels = 9;
		console.log("chp init",this);
	}

	onData () {
    console.log('onData', this);
    Object.assign(this, {
			tooltipContent: function (d) {
				return {rate: d.properties[d.id]};
			},

			domainValue: function (d) {
				return d[this.props.settings.domainValue];
			},

			domainKey: function (d) {
				return d[this.props.settings.domainKey];
			},

			mapKey: function (d) {
				return +d.rate;
			}
		});
	}

  // generate css string from colors array
  css () {
    let css;
    let colors = this.props.settings.colors;
    for (var i = 0; i < this.levels; i++) {
      css += `.q${i}-${this.levels} { fill:${colors[i]}; }`;
    }
  }

	render () {
    let v;
    
    if (this.props.data) {
      Object.assign(this.props.settings, this.props.data, {type : this.props.type}, this.choroplethFunctionDict);

      // add pallet to heat map
      addStyleString(this.css());
      // add stylesheet 
      if (this.props.settings.cssPath) {
        fetchStyleSheet(this.props.settings.cssPath)
          .then(css => {
            addStyleString(css)
          })
          .catch(e => {
            console.log('Trouble fetching component stylesheet', this.props.type, e);
          });
      }
     
     v = <MapChoropleth {...this.props.settings} />;
   } else {
      v = <p class='laoding'>Loading...</p>;
   }

   return(v);
  }
}

let AsyncChoropleth = FetchData(Choropleth);
Registry.set('Choropleth', AsyncChoropleth);
export default AsyncChoropleth;
