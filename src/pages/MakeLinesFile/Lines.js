import React, { useContext } from 'react';

import { StopSearchContext } from '../../providers/stopSearchProvider';
import Download from './Download';

const Lines = () => {
  const { state: { lines } } = useContext(StopSearchContext);

  const json = JSON.stringify(lines);

  return (
    <Download label="lignes" json={json} filename="lignes.json" />
  );
}


export default Lines;
