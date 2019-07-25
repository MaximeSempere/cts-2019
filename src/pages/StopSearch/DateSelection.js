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
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
        <TimePicker
          id="mui-pickers-time"
          ampm={false}
          variant="inline"
          value={date}
          onChange={handleChange}
        />
      </MuiPickersUtilsProvider>
      <Button variant="contained" color="primary" onClick={handleReset}>
        Maintenant
      </Button>
    </div>
  );
}

export default DateSelection;
