import React, { Component } from 'react';
import Registry from '../Registry';
import * as topojson from 'topojson';
import topodata from 'json!../../examples/data/us.json';
import unemploy from 'dsv?delimiter=\t!../../examples/data/unemployment.tsv'
import * as MapChoroplethModule from 'react-d3-map-choropleth';
		
let MapChoropleth = MapChoroplethModule.MapChoropleth;

    var dataCounties = topojson.feature(topodata, topodata.objects.counties).features;
    

		var dataStates = topojson.mesh(topodata, topodata.objects.states, function(a, b) { return a !== b; });
		var domain = {
			scale: 'quantize',
			domain: [0, .15],
			range: d3.range(9).map(function(i) { return "q" + i + "-9"; })
		};

		var domainValue = function(d) { return +d.rate; };
		var domainKey = function(d) {return +d.id};
		var mapKey = function(d) {return +d.id};
		var width = 600;
		var height = 300;
		var scale = 1280;
		var translate = [width / 2, height / 2];
		var projection = 'albersUsa';
 class Choropleth extends Component {

  constructor(props){
 
		super(props);
		}

	render () {    
    return (
   <MapChoropleth
      width= {width}
      height= {height}
      dataPolygon= {dataCounties}
      dataMesh= {dataStates}
      scale= {scale}
      domain= {domain}
      domainData= {unemploy}
      domainValue= {domainValue}
      domainKey= {domainKey}
      mapKey = {mapKey}
      translate= {translate}
      projection= {projection}
      showGraticule= {true}
    />
		);
  }
}

Registry.set('Choropleth', Choropleth);
export default Choropleth;
