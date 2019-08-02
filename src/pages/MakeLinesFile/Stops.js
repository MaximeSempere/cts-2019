import React, { useContext } from 'react';

import { StopSearchContext } from '../../providers/stopSearchProvider';
import Download from './Download';

const Stops = () => {
  const { state: { stops } } = useContext(StopSearchContext);

  const json = JSON.stringify(stops);

  return (
    <Download label="Stops" json={json} filename="stops.json" />
  );
}


export default Stops;
