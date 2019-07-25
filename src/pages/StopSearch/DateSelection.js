import React, { useContext } from 'react';
import { StopSearchContext } from '../../providers/stopSearchProvider';
import { FormLabel } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import locale from 'date-fns/locale/fr';
import {
  MuiPickersUtilsProvider,
  TimePicker
} from '@material-ui/pickers';

const DateSelection = () => {
  const { state: { date, stop }, dispatch } = useContext(StopSearchContext);

  const handleChange = date => {
    dispatch({type: 'DateSelection', data: {date: date}});
  };

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
    </div>
  );
}

export default DateSelection;
