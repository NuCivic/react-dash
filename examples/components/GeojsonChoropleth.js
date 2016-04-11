import React, { Component } from 'react';
import Registry from '../../src/utils/Registry';
import Choropleth from '../../src/components/Choropleth';
import {range} from 'd3';

export default class GeojsonChoropleth extends Choropleth {
	assignChoroplethFunctions() {
   let domainField = this.props.settings.domainField;
   let domainKey = this.props.settings.domainKey;
   Object.assign(this, { choroplethFunctions : {
       tooltipContent: d => {
					let name = d.properties.name;
				 //@@ TODO real vals here
         return {name: 1234};
       },
 
       domainValue: d => {
        console.log('dVal', d[domainField]); 
         return Number(d[domainField]);
       },
 
       domainKey: d => {
        console.log('domainKey',domainKey, d);
				 return Number(d[domainKey]);
       },
 
       mapKey: d => {
        console.log('mapKey', d[domainKey]);
         return d[domainKey];
       }
     }
   });
 }

/*  domainScale(data) {
		console.log('BB', data);
		console.trace();
		let vals = data.map(x => { return x[this.props.settings.domainField] });
    let settings = this.props.settings;
    let dScale = {
       scale: 'quantize',
       domain: [Math.min.apply(Math, vals), Math.max.apply(Math, vals)],
       range: range(settings.levels).map(i => { return `${i}-${settings.levels}`; })
    };
  console.log('BB-s', dScale);	
	return dScale;
 }
*/
}


Registry.set('GeojsonChoropleth', GeojsonChoropleth);
