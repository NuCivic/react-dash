// import React, { Component } from 'react';
// import Registry from '../../src/utils/Registry';
// import Datamap from '../../src/components/Datamap';
// import HoverInfo from '../../src/components/HoverInfo';
// import topojson from 'topojson'
// import d3 from 'd3';
// import { fromJS, List, Map } from 'immutable'

// // const regionData = fromJS({
// //   AL: { name: 'Alabama', code: 'AL', value: 1 },
// //   AK: { name: 'Alaska', code: 'AK', value: 3 },
// //   AZ: { name: 'Arizona', code: 'AZ', value: 4 },
// //   AR: { name: 'Arkansas', code: 'AR', value: 120 },
// //   CA: { name: 'California', code: 'CA', value: 32 },
// //   CO: { name: 'Colorado', code: 'CO', value: 21 },
// //   CT: { name: 'Connecticut', code: 'CT', value: 200 },
// //   DE: { name: 'Delaware', code: 'DE', value: 199 },
// //   DC: { name: 'District of Columbia', code: 'DC', value: 2 },
// //   FL: { name: 'Florida', code: 'FL', value: 54 },
// //   GA: { name: 'Georgia', code: 'GA', value: 4 },
// //   HI: { name: 'Hawaii', code: 'HI', value: 4 },
// //   ID: { name: 'Idaho', code: 'ID', value: 65 },
// //   IL: { name: 'Illinois', code: 'IL', value: 44 },
// //   IN: { name: 'Indiana', code: 'IN', value: 55 },
// //   IA: { name: 'Iowa', code: 'IA', value: 32 },
// //   KS: { name: 'Kansas', code: 'KS', value: 3 },
// //   KY: { name: 'Kentucky', code: 'KY', value: 3 },
// //   LA: { name: 'Lousiana', code: 'LA', value: 3 },
// //   ME: { name: 'Maine', code: 'ME', value: 3 },
// //   MD: { name: 'Maryland', code: 'MD', value: 3 },
// //   MA: { name: 'Massachusetts', code: 'MA', value: 3 },
// //   MI: { name: 'Michigan', code: 'MI', value: 3 },
// //   MN: { name: 'Minnesota', code: 'MN', value: 3 },
// //   MS: { name: 'Mississippi', code: 'MS', value: 2 },
// //   MO: { name: 'Missouri', code: 'MO', value: 3 },
// //   MT: { name: 'Montana', code: 'MT', value: 4 },
// //   NE: { name: 'Nebraska', code: 'NE', value: 4 },
// //   NV: { name: 'Nevada', code: 'NV', value: 4 },
// //   NH: { name: 'New Hampshire', code: 'NH', value: 3 },
// //   NJ: { name: 'New Jersey', code: 'NJ', value: 3 },
// //   NM: { name: 'New Mexico', code: 'NM', value: 3 },
// //   NY: { name: 'New York', code: 'NY', value: 200 },
// //   NC: { name: 'North Carolina', code: 'NC', value: 111 },
// //   ND: { name: 'North Dakota', code: 'ND', value: 100 },
// //   OH: { name: 'Ohio', code: 'OH', value: 54 },
// //   OK: { name: 'Oklahoma', code: 'OK', value: 23 },
// //   OR: { name: 'Oregon', code: 'OR', value: 43 },
// //   PA: { name: 'Pennsylvania', code: 'PA', value: 34 },
// //   RI: { name: 'Rhode Island', code: 'RI', value: 43 },
// //   SC: { name: 'South Carolina', code: 'SC', value: 43 },
// //   SD: { name: 'South Dakota', code: 'SD', value: 6 },
// //   TN: { name: 'Tennessee', code: 'TN', value: 6 },
// //   TX: { name: 'Texas', code: 'TX', value: 56 },
// //   UT: { name: 'Utah', code: 'UT', value: 67 },
// //   VT: { name: 'Vermont', code: 'VT', value: 87 },
// //   VA: { name: 'Virginia', code: 'VA', value: 87 },
// //   WA: { name: 'Washington', code: 'WA', value: 56 },
// //   WV: { name: 'West Virginia', code: 'WV', value: 87 },
// //   WI: { name: 'Wisconsin', code: 'WI', value: 4 },
// //   WY: { name: 'Wyoming', code: 'WY', value: 44 },
// // });
// // Stub for data call
// //
// var regionData = fromJS({
//   'North East' : {name: 'North East', code: 'North East', value: 120},
//   'North Central' : {name: 'North Central', code: 'North Central', value: 20},
//   'North West' : {name: 'North West', code: 'North West', value: 160},
//   'South West' : {name: 'South West', code: 'South West', value: 200},
//   'South East' : {name: 'South East', code: 'South East', value: 89},
//   'South South' : {name: 'South South', code: 'South South', value: 170},
// });


// export default class GAChoropleth extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       infoWindowPos: Map({ x: 0, y: 0 }),
//       infoWindowActive: true,
//       activeSubunitName: 'default',
//     };
//   }

//   componentDidMount() {
//     fetch('./data/zones.geojson')
//       .then((response) => response.json())
//       .then( (data) =>{
//         const topoJSONData = data;
//         const topoJSONFeatures = data.features;
//         this.setState({topoJSONFeatures })

//       });
//   }

//   colorScale() {
//     return d3.scale.linear()
//       .domain([0, 200])
//       .range(["red", "yellow"])
//       .interpolate(d3.interpolateLab)
//   }

//   mouseMoveOnDatamap(e) {
//     const position = Map({ x: e.clientX, y: e.clientY });
//     this.setState({ infoWindowPos: position })
//   }

//   mouseEnterOnDatamap() {
//     this.setState({ infoWindowActive: true })
//   }

//   mouseLeaveDatamap() {
//     this.setState({ infoWindowActive: false })
//   }

//   mouseEnterOnSubunit(name, value) {
//     this.setState({
//       activeSubunitName: name,
//       activeSubunitValue: value,
//     })
//   }

//   render() {
//     const {
//       infoWindowPos,
//       infoWindowActive,
//       activeSubunitName,
//       activeSubunitValue,
//     } = this.state;

//     const svgWidth = 750
//     const svgHeight = svgWidth * 0.8
//     const noDataColor = '#f5f5f5';
//     const borderColor = '#ccc';
//     const colorScale = this.colorScale();
//     const topoData = new Map({usa: this.state.topoJSONFeatures});
//     const regionDataMap = new Map({usa: regionData});
//     const svgStyle = {
//       width: svgWidth,
//       height: svgHeight,
//       fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
//     }
//     if(this.state.topoJSONFeatures) {
//       return (
//         <div className="map-container">
//           <svg className="map-svg" style={svgStyle}>
//             <g id="root-svg-group">
//               <Datamap
//                 topoData={topoData}
//                 mapType='usa'
//                 regionData={regionData}
//                 svgWidth={svgWidth}
//                 svgHeight={svgHeight}
//                 colorScale={colorScale}
//                 noDataColor={noDataColor}
//                 borderColor={borderColor}
//                 mouseMoveOnDatamap={this.mouseMoveOnDatamap.bind(this)}
//                 mouseEnterOnDatamap={this.mouseEnterOnDatamap.bind(this)}
//                 mouseLeaveDatamap={this.mouseLeaveDatamap.bind(this)}
//                 mouseEnterOnSubunit={this.mouseEnterOnSubunit.bind(this)}
//               />
//             </g>
//           </svg>
//           <HoverInfo
//             active={infoWindowActive}
//             position={infoWindowPos}
//             name={activeSubunitName}
//             value={activeSubunitValue}
//           />
//         </div>
//       );
//     } else {
//       return (<div>dsds</div>);
//     }
//   }
// }

// Registry.set('GAChoropleth', GAChoropleth);
