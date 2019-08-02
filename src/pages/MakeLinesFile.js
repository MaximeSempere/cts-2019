import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { StopSearchContext, StopSearchProvider } from '../providers/stopSearchProvider';
import linesDiscovery from '../services/linesDiscovery';
import estimatedTimetable from '../services/estimatedTimetable';

import Lines from './MakeLinesFile/Lines';
import Stops from './MakeLinesFile/Stops';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const MakeLinesFilePage = () => {
  const classes = useStyles();
  const { dispatch } = useContext(StopSearchContext);

  useEffect(() => {
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
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        <Lines />
      </Grid>
      <Grid item xs={12}>
        <Stops />
      </Grid>
    </Grid>
  );
}

const MakeLinesFile = () => {
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
    <StopSearchProvider initialState={StopSearchInitialState}>
      <MakeLinesFilePage />
    </StopSearchProvider>
  );
}

export default MakeLinesFile;
