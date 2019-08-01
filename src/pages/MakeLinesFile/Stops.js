import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import { FormLabel } from '@material-ui/core';

import { StopSearchContext } from '../../providers/stopSearchProvider';

const Stops = () => {
  const { state: { stops } } = useContext(StopSearchContext);

  const json = JSON.stringify(stops);

  return (
    <Paper>
      <FormLabel component="legend">Stops</FormLabel>
      <p>{json}</p>
    </Paper>
  );
}


export default Stops;
