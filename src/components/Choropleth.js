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
import {range, format} from 'd3';
import Dataset from '../models/Dataset';
import FilterSelect from './FilterSelect';

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
	}

  /**
   * Override in sublass to customize behavior
   **/
  _tooltipContent(d) {
    let label = this.props.settings.tooltip.label;
    Object.assign(d, d.properties);
    let val = d[d[this.props.settings.mapKey]] || ''; //catch pre-load undefined
    let tt = {};
    tt[label] = val;
    return tt;
  }

  _domainValue(d)  {
    return Number(d[this.props.settings.domainField]);
  }

  _domainKey(d) {
    return d[this.props.settings.domainKey];
  }

  _mapKey(d) {
    Object.assign(d, d.properties);
    return d[this.props.settings.mapKey];
    return d.properties[this.props.settings.mapKey]; //omainKey;
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

    addStyleString(this.css());
    super.componentDidMount();
  }
  
  // fetchData should set topoData and domainData
  onDataChange(data) {
    this.fetchMapData().then(mapData => {
      this.setState({domainData: data, topodata: mapData});
    });
	}

  fetchMapData() {
    return new Promise((resolve, reject) => {
      let url = this.props.settings.mapDataUrl;
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(d => {
          resolve(d);   
        })
        .catch(e => {
          console.error('Map Data fetch failed', e);
          reject(e);
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
    let domainScale = this.domainScale(this.state.domainData);
    let step = ((domainScale.domain[1] - domainScale.domain[0]) / this.props.settings.levels);
    let formatString = this.props.settings.legendValFormat || 'f';
    let formatPrecision = this.props.settings.legendValPrecision || 2;
    let formatter = format(formatString, formatPrecision);
    let r = range(domainScale.domain[0],  domainScale.domain[1], step);
    r.push(domainScale.domain[1]);
    for (var i = 0; i < this.levels; i++) {
      let lower = formatter(r[i]);
      let upper = formatter(r[i+1]);
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
     let settings = this.props.settings;
     let randKey = this.randKey;
     let dScale = ({
        scale: 'quantize',
        domain: [Number(settings.domainLower), Number(settings.domainUpper)],
        range: range(settings.levels).map(i => { return `${randKey}${i}-${settings.levels}`; })
     });
     return dScale;
  }

  /* 
   * Takes user-selected value and filter data by that row
   */
  filterChoropleth (e) {
    console.log('change', e.target.value, this);
    this.data.map(obj => {
      return obj[this.props.settings.domainKey] = obj[e.target.value];
    }); 
  }

  render () {
    let v;
    let settings = Object.assign({}, this.props.settings);

    if (this.state.domainData) {
      Object.assign(settings, this.state.data, {type : this.props.type});

      settings.topodata = this.state.topodata;
      settings.domainData = this.state.domainData;
      settings.tooltipContent = this._tooltipContent.bind(this);
      settings.domainValue = this._domainValue.bind(this);
      settings.domainKey = this._domainKey.bind(this);
      settings.mapKey = this._mapKey.bind(this);
      settings.domain = this.domainScale(this.state.domainData);
      settings.scale = this.state.componentWidth;

      // Add some sensible defaults
      settings.projection = settings.projection || 'azimuthalEqualArea';

      if (settings.mapFormat === 'topojson') {
        if (settings.polygon) {
          settings.dataPolygon = feature(settings.topodata, settings.topodata.objects[settings.polygon]).features;
        }
        if (settings.mesh) {
          settings.dataMesh = mesh(settings.topodata, settings.topodata.objects[settings.mesh], function(a, b) { return a !== b; });
        }
      } else if (settings.mapFormat === 'geojson') {
        settings.dataPolygon = settings.topodata.features;
      }
      
      // @@STUB for settings values
      let choices =  [{val: 'AAA', title: 'Option A'}, {val: 'BBB', title: 'Options B'}];
      
      v = <div className="choropleth-container">
            <div class="choropleth-select">
              <select class="filter-select" onChange={this.filterChoropleth.bind(this)} value={this.state.filterValue}>
                {
                  choices.map(row => {
                    return <option value={row.val}>{row.title}</option>
                  })
                }
              </select>
            </div>
            <MapChoropleth ref="choropleth" {...settings} />
            <div className="legend-container">
              <h3 className="legend-header">{settings.legendHeader}</h3>
              <Legend
                width= {this.state.componentWidth}
                height= {settings.legendHeight}
                margins= {settings.legendMargins}
                legendClassName= {settings.legendClassName}
                legendPosition= {settings.legendPosition}
                legendOffset= {settings.legendOffset}
                chartSeries = {this.legendSeries()}
              />
            </div>
         </div>;
   } else {
      v = <p ref="choropleth" className='loading'>Loading...</p>;
   }

   return(v);
  }
}

Registry.set('Choropleth', Choropleth);
