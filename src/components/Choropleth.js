console.log('Cho001');
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
import BaseComponent from './BaseComponent';
import React, { Component } from 'react';
import Registry from '../utils/Registry';
import * as MapChoroplethModule from 'react-d3-map-choropleth';

import t1 from 'json!../../examples/data/us.json';
import d1 from 'dsv?delimiter=\t!../../examples/data/unemployment.tsv';
import * as D3 from 'd3';
import * as topojson from 'topojson';

let MapChoropleth = MapChoroplethModule.MapChoropleth;

// @@TODO - we should baseclass the css functions
// Whack some css into the page
function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.head.appendChild(node);
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

export default class Choropleth extends BaseComponent {
  constructor(props){
		super(props);
    this.levels = 9;
    let domainVal = this.props.settings.domain;
    let domainKey = this.props.settings.domainKey;

    var self = this;
    Object.assign(this, { choroplethFunctions : {
        tooltipContent: function (d) {
          return {rate: d.properties[d[domainKey]]};
        },

        domainValue: function (d) {
          return +d[domainVal];
        },

        domainKey: function (d) {
          return +d[domainKey];
        },

        mapKey: function (d) {
          return +d[domainKey];
        }
      }
		});
	}

  // fetchData should set topoData and domainData
  onData (data) {
    // @@TODO Maybe we should validate this stuff
    this.setState({foo: 'bar', data: data});
	}

  // generate css string from colors array
  css () {
    let _css = '';
    let colors = this.props.settings.colors;
    for (var i = 0; i < this.levels; i++) {
      css += `.q${i}-${this.levels} { fill:${colors[i]}; }`;
    }
    return _css;
  }

	render () {
    let v;
    if (this.state.foo) {
      Object.assign(this.props.settings, this.state.data, {type : this.props.type}, this.choroplethFunctions);

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

      this.props.settings.topodata = t1;
      this.props.settings.domainData = d1;
      this.props.settings.dataPolygon = topojson.feature(t1, t1.objects.counties).features;
      this.props.settings.dataMesh = topojson.mesh(t1, t1.objects.states, function(a, b) { return a !== b; });

      this.props.settings.domain = {
        scale: 'quantize',
        domain: [0, .15],
        range: d3.range(9).map(function(i) { return "q" + i + "-9"; })
      };

      console.log('>>' , this.props.settings);
     v = <MapChoropleth {...this.props.settings} />;
      // add pallet to heat map
      console.log('css',this.css());
      addStyleString(this.css());
   } else {
      v = <p className='laoding'>Loading...</p>;
   }

   return(v);
  }
}

Registry.set('Choropleth', Choropleth);
