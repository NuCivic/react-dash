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
import ReactDOM from 'react-dom';
import * as D3Core from 'react-d3-core';
import Registry from '../utils/Registry';
import * as MapChoroplethModule from 'react-d3-map-choropleth';
import t1 from 'json!../../examples/data/us.json';
import d1 from 'dsv?delimiter=\t!../../examples/data/unemployment.tsv';
import * as D3 from 'd3';
import * as topojson from 'topojson';

let Legend = D3Core.Legend;
let MapChoropleth = MapChoroplethModule.MapChoropleth;
let legendWidth = 500,
  legendHeight = 400,
  legendMargins = {top: 40, right: 50, bottom: 40, left: 50},
  legendClassName = "test-legend-class",
  legendPosition = 'left',
  legendOffset = 90;

// Whack some css into the page
function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.head.appendChild(node);
}

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
    let domainField = this.props.settings.domainField;
    let domainKey = this.props.settings.domainKey;
    console.log('domains', domainKey, domainField);
    var self = this;
    Object.assign(this, { choroplethFunctions : {
        tooltipContent: function (d) {
          console.log(d, domainField, d[domainKey]);
          return {rate: d.properties[d[domainKey]]};
        },

        domainValue: function (d) {
          return +d[domainField];
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
  onDataReady(data) {
    // @@TODO Maybe we should validate this stuff
    this.setState({foo: 'bar'});
	}
  componentDidMount () {
    this._attachResize();
    this._setSize();
    super.componentDidMount();
  }

  _setSize() {
    const { offsetWidth, offsetHeight } = this.refs.choropleth;
    this.setState({
      gridWidth: offsetWidth,
      gridHeight: offsetHeight
    });
  }

  _attachResize() {
    window.addEventListener('resize', this._setSize.bind(this), false);
  }

  // generate css string from colors array
  css () {
    let _css = '';
    let colors = this.props.settings.colors;
    for (var i = 0; i < this.levels; i++) {
      _css += `.q${i}-${this.levels} { fill:${colors[i]}; }`;
    }
    return _css;
  }

  legendSeries () {
    let series = [];
    let domainVal = .015;
    for (var i = 0; i < this.levels; i++) {
      let lower = domainVal*i.toFixed(2);
      let upper = domainVal*(i+1).toFixed(2);
      let item = {
        field: `${lower} -- ${upper}`,
        name: `${lower} -- ${upper}`,
        color: this.props.settings.colors[i]
      }
      series.push(item);
    }
    return series;
  }

  render () {
    let v;
    let settings = Object.assign({}, this.props.settings);

      console.log('>', settings);
    if (this.state.foo) {
      Object.assign(settings, this.state.data, {type : this.props.type}, this.choroplethFunctions);

      // add stylesheet
      if (settings.cssPath) {
        fetchStyleSheet(settings.cssPath)
          .then(css => {
            addStyleString(css)
          })
          .catch(e => {
            console.log('Trouble fetching component stylesheet', this.props.type, e);
          });
      }
      settings.topodata = t1;
      settings.domainData = d1;
      settings.dataPolygon = topojson.feature(t1, t1.objects.counties).features;
      settings.dataMesh = topojson.mesh(t1, t1.objects.states, function(a, b) { return a !== b; });
      settings.scale = this.state.gridWidth;
      settings.domain = {
        scale: 'quantize',
        domain: [settings.domainLower, settings.domainUpper],
        range: d3.range(settings.levels).map(function(i) { return `q${i}-${settings.levels}`; })
      };

     console.log('>>', settings);
     v = <div className="choropleth-container">
            <MapChoropleth ref="choropleth" {...settings} />
            <Legend
              width= {legendWidth}
              height= {legendHeight}
              margins= {legendMargins}
              legendClassName= {legendClassName}
              legendPosition= {legendPosition}
              legendOffset= {legendOffset}
              chartSeries = {this.legendSeries()}
            />
         </div>;
      // add pallet to heat map
      console.log('css',this.css());
      addStyleString(this.css());
   } else {
      v = <p ref="choropleth" className='laoding'>Loading...</p>;
   }

   return(v);
  }
}

Registry.set('Choropleth', Choropleth);
