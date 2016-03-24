import React, { Component } from 'react';
import Registry from '../Registry';
import * as topojson from 'topojson';
import topodata from 'json!../../examples/data/us.json';
import domainData from 'dsv?delimiter=\t!../../examples/data/unemployment.tsv';
import * as MapChoroplethModule from 'react-d3-map-choropleth';

let MapChoropleth = MapChoroplethModule.MapChoropleth;

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}


// https://github.com/react-d3/react-d3-map-choropleth for documentation

class Choropleth extends Component {

  constructor(props){
		super(props);
	}

	render () {
    console.log('ch1',this); 
    
    this.props.settings.dataPolygon = topojson.feature(topodata, topodata.objects.counties).features;
    this.props.settings.dataMesh = topojson.mesh(topodata, topodata.objects.states, function(a, b) { return a !== b; });
    this.props.settings.domain = {
      scale: 'quantize',
      domain: [0, .15],
      range: d3.range(9).map(function(i) { return "q" + i + "-9"; })
    };
    this.props.settings.domainData = domainData;

    // add pallet to heat map
    addStyleString(this.props.settings.css);

    return (
     <MapChoropleth {...this.props.settings} 
//        width= {this.settings.width}
//        height= {this.settings.height}
//        dataPolygon= {this.settings.dataPolygon}
//        dataMesh= {this.settings.dataMesh}
//        scale= {this.settings.scale}
//        domain= {this.settings.domain}
//        domainData= {this.settings.domainData}
//        domainValue= {this.settings.domainValue}
//        domainKey= {this.settings.domainKey}
//        mapKey = {this.settings.mapKey}
//        translate= {this.settings.translate}
//        projection= {this.settings.projection}
//        showGraticule= {this.settings.showGraticule}
//        tooltipContent= {this.settings.tooltipContent}
      />
		);
  }
}

Registry.set('Choropleth', Choropleth);
export default Choropleth;
