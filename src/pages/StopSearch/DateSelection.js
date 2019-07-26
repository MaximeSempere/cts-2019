import React, { useContext } from 'react';
import { StopSearchContext } from '../../providers/stopSearchProvider';
import { FormLabel } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import locale from 'date-fns/locale/fr';
import {
  MuiPickersUtilsProvider,
  TimePicker
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const DateSelection = () => {
  const { state: { date, stop }, dispatch } = useContext(StopSearchContext);

  const handleChange = date => {
    dispatch({type: 'DateSelection', data: {date: date}});
  };

  const handleReset = () => {
    dispatch({type: 'DateSelection', data: {date: new Date()}});
  }

  if (stop === null) {
    return <div></div>;
  }

  return (
    <div>
      <FormLabel component="legend">Horaire</FormLabel>
      <Grid container justify="center" spacing={2}>
        <Grid key='LineSelection' item xs={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
            <TimePicker
              id="mui-pickers-time"
              ampm={false}
              variant="inline"
              value={date}
              onChange={handleChange}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid key='LineSelection' item xs={6}>
          <Button variant="contained" color="primary" onClick={handleReset}>
            >
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default DateSelection;
