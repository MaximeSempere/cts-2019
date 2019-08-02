import React, { useContext, useEffect } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

import { StopSearchContext, StopSearchProvider } from '../providers/stopSearchProvider';
import linesDiscovery from '../services/linesDiscovery';
import estimatedTimetable from '../services/estimatedTimetable';

import lines from '../services/cache/lines';
import stops from '../services/cache/stops';

import Form from './StopSearch/Form';

import ctsTheme from '../themes/ctsTheme';

import { ThemeProvider } from '@material-ui/styles';

const StopSearchPage = withRouter(( {location} ) => {
  const { dispatch } = useContext(StopSearchContext);

  console.log(location)
  const qs = queryString.parse(location.search);
  const nocache = qs.nocache;

  useEffect(() => {
    dispatch({type: 'loading'});

    if (typeof(nocache) !== 'undefined') {
      // No cache - direct from cts api
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
    } else {
      // App pre generated cache
      lines({
        dispatch: dispatch,
        type: 'setLinesFromCache',
        params: {}
      });

      stops({
        dispatch: dispatch,
        type: 'setStopsFromCache',
        params: {}
      });
    }
  }, [dispatch, nocache]);

  return (
    <Form />
  );
});

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
