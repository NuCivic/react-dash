import React, { Component } from 'react';
import Registry from '../../utils/Registry';
import BaseComponent from '../BaseComponent';
import Loader from '../Loader';
import Datamap from './Datamap';
import HoverInfo from './HoverInfo';
import topojson from 'topojson'
import d3 from 'd3';
import MapLegend from './MapLegend';
console.log('MAP', Datamap);
export default class Choropleth extends BaseComponent {

  constructor(props) {
    super(props);
    let newState = {
      infoWindowPos: new Map([['x',0], ['y', 0]]),
      infoWindowActive: true,
      activeSubunitName: 'default',
    };
    this.state = Object.assign(this.state, newState);
  }

  componentDidMount() {
    super.componentDidMount();
    console.log('A', this);
    fetch(this.props.geometry)
      .then(response => {
        let r = response.json()
        return r;
      })
      .then( (data) =>{
        console.log('A1', data);
        var geometryFeatures;
        if (this.props.format === 'geojson') {
          geometryFeatures = data.features;
        } else {
          geometryFeatures = topojson.feature(
            data,
            data.objects[this.props.topologyObject]
          ).features;
        }
        this.setState({geometryFeatures })
      });
  }

  linearScale(min, max) {
    return () => {
      const startColor = this.legend.startColor;
      const endColor = this.legend.endColor;

      return d3.scale.linear()
        .domain([min, max])
        .range([startColor, endColor])
        .interpolate(d3.interpolateLab)
    }
  }

  equidistantScale(min, max) {
    return () => {
      const colorPallete = this.props.legend.pallete;

      if (min === max) {
        return () => colorPallete[colorPallete.length - 1]
      }

      return d3.scale.quantize().domain([min, max]).range(colorPallete);
    }
  }

  extremeValues(){
    const valueField = this.props.dataValueField;
    const data = this.state.data;
    const max = d3.max(data.map((d) => d[valueField]));
    const min = d3.min(data.map((d) => d[valueField]));
    console.log('extreme', max, min);
    return new Map([ ['min', min], ['max', max] ]);
  }

  colorScale() {
    const extremeValues =  this.extremeValues();
    const min = extremeValues.get('min');
    const max = extremeValues.get('max');

    const scales = {
      linear: this.linearScale(min, max),
      equidistant: this.equidistantScale(min, max)
    };

    return scales[this.props.dataClassification]();
  }

  mouseMoveOnDatamap(e) {
    const position = new Map([['x', e.clientX], ['y', e.clientY]]);
    this.setState({ infoWindowPos: position })
  }

  mouseEnterOnDatamap() {
    this.setState({ infoWindowActive: true })
  }

  mouseLeaveDatamap() {
    this.setState({ infoWindowActive: false })
  }

  mouseEnterOnSubunit(name, value) {
    this.setState({
      activeSubunitName: name,
      activeSubunitValue: value,
    });
  }
  
  onResize() {
    this.setState({svgResized: true});
  }

  render() {
    const svgWidth = this.state.componentWidth * .8;
    const svgHeight = svgWidth * 0.8;
    const extremeValues = this.extremeValues();
    const {
      infoWindowPos,
      infoWindowActive,
      activeSubunitName,
      activeSubunitValue,
    } = this.state;

    const mapLegend = (
      <MapLegend
        svgWidth={svgWidth}
        svgHeight={svgHeight}
        extremeValues={extremeValues || new Map()}
        dataClassification={this.props.dataClassification}
        {...this.props}
      />
    );
    
    console.log('CH', this);

    const colorScale = this.colorScale();
    const noDataColor = this.props.noDataColor || '#f5f5f5';
    const borderColor = this.props.borderColor || '#cccccc';
    const geometryFeatures = this.state.geometryFeatures || [];
    const loading = this.state.geometryFeatures && this.state.data;
    const svgStyle = {
      width: svgWidth,
      height: svgHeight,
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    }
    return (
      <Loader isFeching={!loading}>
        <div className="map-container">
          <svg className="map-svg" style={svgStyle}>
            <g id="root-svg-group">
              <Datamap
                {...this.props}
                geometry={geometryFeatures}
                colorScale={colorScale}
                noDataColor={noDataColor}
                borderColor={borderColor}
                svgWidth={svgWidth}
                svgHeight={svgHeight}
                svgResized={this.state.svgResized}
                componentWidth={this.state.componentWidth}
                mouseMoveOnDatamap={this.mouseMoveOnDatamap.bind(this)}
                mouseEnterOnDatamap={this.mouseEnterOnDatamap.bind(this)}
                mouseLeaveDatamap={this.mouseLeaveDatamap.bind(this)}
                mouseEnterOnSubunit={this.mouseEnterOnSubunit.bind(this)}
                regionData={this.state.data}
              />
              {extremeValues && mapLegend}
            </g>
          </svg>
          <HoverInfo
            active={infoWindowActive}
            position={infoWindowPos}
            name={activeSubunitName}
            value={activeSubunitValue}
          />
        </div>
     </Loader>
    );
  }
}

Registry.set('Choropleth', Choropleth);
