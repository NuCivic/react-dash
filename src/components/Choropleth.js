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
import {Legend} from 'react-d3-core';
import Registry from '../utils/Registry';
import {makeKey} from '../utils/utils';
import {MapChoropleth} from 'react-d3-map-choropleth';
import {mesh, feature} from 'topojson';
import {range} from 'd3';
import Dataset from '../models/Dataset';


// @@TODO Add geojson implementation

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
    this.levels = this.props.settings.levels;
    this.randKey = makeKey(4);
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
          return Number(d[domainField]);
        },

        domainKey: function (d) {
          return Number(d[domainKey]);
        },

        mapKey: function (d) {
          return Number(d[domainKey]);
        }
      }
		});
	}

  // fetchData should set topoData and domainData
  onDataReady(data) {
    console.log('onData', data);
    this.setState({domainData: data.domainData, topodata: data.topodata});
	}

  componentDidMount () {
    this._attachResize();
    this._setSize();
  
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

    if (this.props.fetchData && this[this.props.fetchData]) {
      console.log('cp-f1',this.props);
      this.fetchData().then(this.onData.bind(this)).catch(e => {console.log('Error fetching data', e)});
    }

    addStyleString(this.css());
    super.componentDidMount();
  }

  fetchData() {
    return new Promise((resolve, reject) => {
      
      let dataset = new Dataset(this.props.settings.dataset);
      let response = {};
      fetch(this.props.settings.mapDataUrl)
        .then(res => {
          let d = res.json();
          console.log('***Dataset fetch res', res, d);
          return d;
        })
        .then(data => {
          console.log('fetch 2', data);
          response.topodata = data;
          dataset.fetch()
            .then(data => {
              console.log('Ch-df-1',data);
              dataset.query({})
                .then(data => {
                  console.log('Dataset response', data);
                  response.domainData = data.hits;
                  return resolve(response);
                })
            })
            .catch(e => {
              console.log('Dataset fetch failed', e);
              return reject(e);
            })
        })
        .catch(e => {
          return reject(e); 
        });
    });
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

      console.log('>', settings, this.state);
    if (this.state.domainData) {
      Object.assign(settings, this.state.data, {type : this.props.type}, this.choroplethFunctions);

      settings.topodata = this.state.topodata;
      settings.domainData = this.state.domainData;
      console.log('>1',settings);

      if (settings.topojson) {
        console.log('render topo', this.state.topodata);
        settings.dataPolygon = feature(this.state.topodata, this.state.topodata.objects[settings.polygonFeature]).features;
        settings.dataMesh = mesh(this.state.topodata, this.state.topodata.objects[settings.meshFeature], function(a, b) { return a !== b; });
      } else if (settings.geojson) {
        console.log('render geo');
       //  @@TODO geojson implementation
      }
      
      settings.scale = this.state.gridWidth;
      settings.domain = {
        scale: 'quantize',
        domain: [settings.domainLower, settings.domainUpper],
        range: range(settings.levels).map(function(i) { return `q${i}-${settings.levels}`; })
      };
     console.log('>>', settings);
     v = <div className="choropleth-container">
            <MapChoropleth ref="choropleth" {...settings} />
            <div className="legend-container">
              <h3 className="legend-header">{settings.legendHeader}</h3>
              <Legend
                width= {legendWidth}
                height= {legendHeight}
                margins= {legendMargins}
                legendClassName= {legendClassName}
                legendPosition= {legendPosition}
                legendOffset= {legendOffset}
                chartSeries = {this.legendSeries()}
              />
            </div>
         </div>;
   } else {
      v = <p ref="choropleth" className='laoding'>Loading...</p>;
   }

   return(v);
  }
}

Registry.set('Choropleth', Choropleth);
