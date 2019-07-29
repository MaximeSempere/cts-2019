import React, { useContext } from 'react';
import { StopSearchContext } from '../../providers/stopSearchProvider';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'

import stopMonitoring from '../../services/stopMonitoring';

const SearchButton = ( {history} ) => {
  const { state: { stop, date, line, maxStopArrivals, VehicleMode, baseUrl }, dispatch } = useContext(StopSearchContext);

  const url = baseUrl+VehicleMode.bus+'/'+VehicleMode.tram+'/'+line+'/'+stop;

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

    history.push(url);
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

export default withRouter(SearchButton);
