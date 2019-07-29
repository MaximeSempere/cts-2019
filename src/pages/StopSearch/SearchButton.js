import React, { useContext } from 'react';
import { StopSearchContext } from '../../providers/stopSearchProvider';
import Button from '@material-ui/core/Button';

import stopMonitoring from '../../services/stopMonitoring';

const DateSelection = () => {
  const { state: { stop, date, line, maxStopArrivals }, dispatch } = useContext(StopSearchContext);

  const handleChange = () => {
    dispatch({type: 'loading'});

    stopMonitoring({
      dispatch: dispatch,
      type: 'Search',
      params: {
        MonitoringRef: stop,
        LineRef: line,
        StartTime: date,
        MaximumStopVisits: maxStopArrivals
      }
    });

  };

  if (stop === null) {
    return <div></div>;
  }

  return (
    <Button variant="contained" color="primary" onClick={handleChange}>
      Rechercher
    </Button>
  );
}

export default DateSelection;
