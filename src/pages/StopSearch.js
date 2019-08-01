import React, { useContext, useEffect } from 'react';
import { StopSearchContext, StopSearchProvider } from '../providers/stopSearchProvider';
import linesDiscovery from '../services/linesDiscovery';
import estimatedTimetable from '../services/estimatedTimetable';

import Form from './StopSearch/Form';

import ctsTheme from '../themes/ctsTheme';

import { ThemeProvider } from '@material-ui/styles';

const StopSearchPage = () => {
  const { dispatch } = useContext(StopSearchContext);

  useEffect(() => {
    dispatch({type: 'loading'});

    linesDiscovery({
      dispatch: dispatch,
      type: 'setLines',
      params: {}
    });

    estimatedTimetable({
      dispatch: dispatch,
      type: 'setStops',
      params: {}
    });
  }, [dispatch]);

  return (
    <Form />
  );
}

const StopSearch = () => {
  const StopSearchInitialState = {
    lines: [],
    stops: [],
    VehicleMode: {
      bus: true,
      tram: true
    },
    line: null,
    stop: null,
    date: new Date(),
    results: [],
    maxStopArrivals: 5,
    loading: false
  };

  return (
    <ThemeProvider theme={ctsTheme}>
      <StopSearchProvider initialState={StopSearchInitialState}>
        <StopSearchPage />
      </StopSearchProvider>
    </ThemeProvider>
  );
}

export default StopSearch;
