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
import * as topojson from 'topojson';
import * as MapChoroplethModule from 'react-d3-map-choropleth';
import {FetchData} from './FetchData';

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
  console.log('css00');
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        console.log('css0',res);
        return res.text();
      })
      .then(css => {
        console.log('CSS!', css);
        resolve(css);  
      })
      .catch(e => {
        console.log('E!', e);
        reject(e);
      });
  });
}

// @@TODO move data fetchers to appStore
import topodata from 'json!../../examples/data/us.json';
import domainData from 'dsv?delimiter=\t!../../examples/data/unemployment.tsv';

class Choropleth extends Component {

  constructor(props){
		super(props);
	}
  
	render () {
    console.log('ch1',this); 
    let v;
    
    if (this.props.data) {
      Object.assign(this.props.settings, this.props.data, {type : this.props.type});

      // add pallet to heat map
      addStyleString(this.props.settings.css);
      // add stylesheet 
      if (this.props.settings.cssPath) {
        console.log('ch-r-css-1');
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
