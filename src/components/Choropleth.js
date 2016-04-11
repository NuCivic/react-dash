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


// @@TODO we need dynamic values here
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
    this.assignChoroplethFunctions();
	}

  /**
   * Override in sublass to customize behavior
   **/
  assignChoroplethFunctions() {
    let domainField = this.props.settings.domainField;
    let domainKey = this.props.settings.domainKey;
    Object.assign(this, { choroplethFunctions : {
        tooltipContent: d => {
          return {rate: d.properties[d[domainKey]]};
        },

        domainValue: d => {
          console.log(d[domainField]);
          return Number(d[domainField]);
        },

        domainKey: d => {
          return Number(d[domainKey]);
        },

        mapKey: d => {
          console.log('A>',d[domainKey],d,domainKey);
          return Number(d[domainKey]);
        }
      }
		});
  }

  // fetchData should set topoData and domainData
  onDataReady(data) {
    this.setState({domainData: data.domainData, topodata: data.topodata});
	}
    
  componentDidMount () {
    // add stylesheet
    if (this.props.settings.cssPath) {
      fetchStyleSheet(this.props.settings.cssPath)
        .then(css => {
          addStyleString(css)
        })
        .catch(e => {
        });
    }

    if (this.props.fetchData) {
      this.fetchData().then(this.onData.bind(this)).catch(e => {
        console.log('Error fetching data', e);
      });
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
          return d;
        })
        .then(data => {
          response.topodata = data;
          dataset.fetch()
            .then(data => {
              dataset.query({})
                .then(data => {
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

  _attachResize() {
    window.addEventListener('resize', this._setSize.bind(this), false);
  }

  // generate css string from colors array
  css () {
    let _css = '';
    let randKey = this.randKey;
    let colors = this.props.settings.colors;
    for (var i = 0; i < this.levels; i++) {
      _css += `.${randKey}${i}-${this.levels} { fill:${colors[i]}; }`;
    }
    return _css;
  }

  legendSeries () {
    let series = [];
    let domainScale = this.domainScale();
    let step = ((domainScale.domain[1] - domainScale.domain[0]) / this.props.settings.levels);
    let r = range(domainScale.domain[0],  domainScale.domain[1], step);
    r.push(domainScale.domain[1]);
    console.log('r',r);
    let prec = this.props.settings.legendValPrecision;
    for (var i = 0; i < this.levels; i++) {
      console.log(r[i], r[i+1], prec);
      let lower = r[i].toFixed(prec);
      let upper = r[i+1].toFixed(prec);
      let item = {
        field: `${lower} -- ${upper}`,
        name: `${lower} -- ${upper}`,
        color: this.props.settings.colors[i]
      }
      series.push(item);
    }
    return series;
  }
  
  domainScale(data) {
    console.log('AAA');
     let settings = this.props.settings;
     let randKey = this.randKey;
     let x = ({
        scale: 'quantize',
        domain: [Number(settings.domainLower), Number(settings.domainUpper)],
        range: range(settings.levels).map(i => { return `${randKey}${i}-${settings.levels}`; })
     });
     return x;
  }

  render () {
    let v;
    let settings = Object.assign({}, this.props.settings);

    if (this.state.domainData) {
      Object.assign(settings, this.state.data, {type : this.props.type}, this.choroplethFunctions);

      settings.topodata = this.state.topodata;
      settings.domainData = this.state.domainData;

      if (settings.mapFormat === 'topojson') {
        if (settings.polygon) {
          settings.dataPolygon = feature(settings.topodata, settings.topodata.objects[settings.polygon]).features;
        }
        if (settings.mesh) {
          settings.dataMesh = mesh(settings.topodata, settings.topodata.objects[settings.mesh], function(a, b) { return a !== b; });
        }
      } else if (settings.mapFormat === 'geojson') {
        settings.dataPolygon = feature(settings.topodata, settings.topodata.objects[settings.pol]);
      }

      settings.scale = this.state.gridWidth;

      settings.domain = this.domainScale(this.state.domainData);
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
