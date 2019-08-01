import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import { FormLabel } from '@material-ui/core';

import { StopSearchContext } from '../../providers/stopSearchProvider';

const Lines = () => {
  const { state: { lines } } = useContext(StopSearchContext);

  const json = JSON.stringify(lines);

  return (
    <Paper>
      <FormLabel component="legend">Lignes</FormLabel>
      <p>{json}</p>
    </Paper>
  );
}


export default Lines;
