import React from 'react';
import LinearLegend from './LinearLegend';
import EquidistantLegend from './EquidistantLegend';

const MapLegend = (props) => {
  const linearLegend = <LinearLegend {...props} />;
  const equidistantLegend = <EquidistantLegend {...props} />;
  const legends = {
    linear: linearLegend,
    equidistant: equidistantLegend,
  };

  return legends[props.dataClassification];
};

MapLegend.propTypes = {};

export default MapLegend;
