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
import ReactDOM from 'react-dom';
import Legend from 'react-d3-core';
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
  componentDidMount () {
    this._attachResize();
    this._setSize();
    if (this.props.fetchData && this[this.props.fetchData]) {
      this.fetchData().then(this.onData.bind(this));
    }
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
      this.props.settings.scale = this.state.gridWidth;
//      this.props.settings.height = this.state.gridHeight;
      this.props.settings.domain = {
        scale: 'quantize',
        domain: [0, .15],
        range: d3.range(9).map(function(i) { return "q" + i + "-9"; })
      };

      console.log('>>' , this.props.settings);
     v = <div className="choropleth-container">
          <MapChoropleth ref="choropleth" {...this.props.settings} />
          <div id="choropleth-legend"></div>
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

let width = 500,
  height = 400,
  margins = {top: 40, right: 50, bottom: 40, left: 50},
  legendClassName = "test-legend-class",
  legendPosition = 'left',
  legendOffset = 90,
  chartSeries = [
    {
      field: 'Under 5 Years',
      name: 'Under 5 Years',
      color: '#1f77b4'
    },
    {
      field: '5 to 13 Years',
      name: '5 to 13 Years',
      color: '#ff7f0e'
    },
    {
      field: '14 to 17 Years',
      name: '14 to 17 Years',
      color: '#2ca02c'
    },
    {
      field: '18 to 24 Years',
      name: '18 to 24 Years',
      color: '#d62728'
    },
    {
      field: '25 to 44 Years',
      name: '25 to 44 Years',
      color: '#9467bd'
    },
    {
      field: '45 to 64 Years',
      name: '45 to 64 Years',
      color: '#8c564b'
    },
    {
      field: '65 Years and Over',
      name: '65 Years and Over',
      color: '#e377c2'
    },

  ]

/*ReactDOM.render(
  <Legend
    width= {width}
    height= {height}
    margins= {margins}
    legendClassName= {legendClassName}
    legendPosition= {legendPosition}
    legendOffset= {legendOffset}
    chartSeries = {chartSeries}
  />
, document.getElementById('choropleth-legend')
)*/
Registry.set('Choropleth', Choropleth);
