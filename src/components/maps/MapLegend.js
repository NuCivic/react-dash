import React, { PropTypes } from 'react';

import LinearLegend from './LinearLegend';
import EquidistantLegend from './EquidistantLegend';

const MapLegend = (props) => {
  const dataClassification = props.dataClassification;
  const linearLegend = <LinearLegend {...props} />
  const equidistantLegend = <EquidistantLegend {...props} />
  const legends = {
    linear: linearLegend,
    equidistant: equidistantLegend,
  };
  console.log(props.dataClassification);
  return legends[props.dataClassification];
}

MapLegend.propTypes = {};

export default MapLegend;