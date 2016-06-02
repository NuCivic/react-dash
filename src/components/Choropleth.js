// @@TODO @@
// ** copy props.settings to state and use state in all operations
// ** get human title for legendHeader

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

const DEFAULT_PROJECTION = 'azimuthalEqualArea';

// Whack some css into the page
function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.head.appendChild(node);
}

// Fetch css
// @@TODO - we should use a more standard solution here
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
    this.state.settings = this.props.settings;
    this.randKey = makeKey(4);

    // @@TODO - we could optimize this
    if (this.state.settings.filters) {
      this.state.current_filter = this.state.settings.filters[0];
      this.filterChoropleth(null, this.state.current_filter.field);
    }
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
  
  // Used by choropleth to calculate the key for each row of data
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
    let levels = this.state.settings.levels;
    let randKey = this.randKey;
    let colors = this.state.settings.colors;
    for (var i = 0; i < levels; i++) {
      _css += `.${randKey}${i}-${levels} { fill:${colors[i]}; }`;
    }
    return _css;
  }

  legendSeries () {
    let series = [];
    let filter = this.state.current_filter;
    let domainScale = this.domainScale(this.state.domainData);
    let step = ((domainScale.domain[1] - domainScale.domain[0]) / this.state.settings.levels);
    let formatString = filter.legendValFormat || 'f';
    let formatPrecision = filter.legendValPrecision || 2;
    let formatter = format(formatString, formatPrecision);
    let r = range(domainScale.domain[0],  domainScale.domain[1], step);
    r.push(domainScale.domain[1]);
    for (var i = 0; i < this.state.settings.levels; i++) {
      let lower = formatter(r[i]);
      let upper = formatter(r[i+1]);
      let item = {
        field: `${lower} -- ${upper}`,
        name: `${lower} -- ${upper}`,
        color: this.state.settings.colors[i]
      }
      series.push(item);
    }
    return series;
  }

  domainScale(data) {
     let randKey = this.randKey;
     let limits = this.getDomainLimits();
     let levels = this.state.settings.levels;
     let dScale = ({
        scale: 'quantize',
        domain: limits,
        range: range(levels).map(i => { return `${randKey}${i}-${levels}`; })
     });
     return dScale;
  }

  /* 
   * Takes user-selected value and filter data by that row
   */
  filterChoropleth (e, val) {
    let key = this.props.settings.domainKey;
    let filteredData = [];
    let current_filter = this.state.settings.filters.filter(o => { return o.rate === val});
    val = val || e.target.value;
    
    this.state.data.forEach(obj => {
      let row = {};
      row[key] = obj[key];
      row[val] = obj[val];
      filteredData.push(row);
    });
    
    this.state.settings.domainField = val;
    this.setState({
      domainData : filteredData,
      current_filter : current_filter
    });
  }
  
  /*
   * Return upper and lower limits from domain data
   */
  getDomainLimits () {
    let d = this.state.settings.domainField;
    let lower = Math.min.apply(Math, this.state.domainData.map(function(o){return o[d];}));
    let upper = Math.max.apply(Math, this.state.domainData.map(function(o){return o[d];}));
    return [lower, upper];
  }

  render () {
    let v;
    // create options object for rendering choropleth
    let opts = Object.assign({}, this.state.settings);

    if (this.state.domainData) {
      // @@ this looks like it is extraneous
      //Object.assign(settings, this.state.data, {type : this.props.type});

      opts.topodata = this.state.topodata;
      opts.domainData = this.state.domainData;
      opts.tooltipContent = this._tooltipContent.bind(this);
      opts.domainValue = this._domainValue.bind(this);
      opts.domainKey = this._domainKey.bind(this);
      opts.mapKey = this._mapKey.bind(this);
      opts.domain = this.domainScale(this.state.domainData);
      opts.scale = this.state.componentWidth;
      opts.legendHeader = this.state.current_filter.legendHeader;
      // Add some sensible defaults
      opts.projection = opts.projection || DEFAULT_PROJECTION;
      if (opts.mapFormat === 'topojson') {
        if (opts.polygon) {
          opts.dataPolygon = feature(opts.topodata, opts.topodata.objects[opts.polygon]).features;
        }
        if (opts.mesh) {
          opts.dataMesh = mesh(opts.topodata, opts.topodata.objects[opts.mesh], function(a, b) { return a !== b; });
        }
      } else if (opts.mapFormat === 'geojson') {
        opts.dataPolygon = opts.topodata.features;
      }
      
      v = <div className="choropleth-container">
            <div class="choropleth-select">
              <select class="filter-select" onChange={this.filterChoropleth.bind(this)} value={this.state.filterValue}>
                {
                  opts.filters.map(filter => {
                    return <option value={filter.field}>{filter.title}</option>
                  })
                }
              </select>
            </div>
            <MapChoropleth ref="choropleth" {...opts} />
            <div className="legend-container">
              <h3 className="legend-header">{opts.legendHeader}</h3>
              <Legend
                width= {this.state.componentWidth}
                height= {opts.legendHeight}
                margins= {opts.legendMargins}
                legendClassName= {opts.legendClassName}
                legendPosition= {opts.legendPosition}
                legendOffset= {opts.legendOffset}
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
