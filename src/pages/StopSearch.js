import React, { useContext, useEffect } from 'react';
import { StopSearchContext, StopSearchProvider } from '../providers/stopSearchProvider';
import linesDiscovery from '../services/linesDiscovery';
import estimatedTimetable from '../services/estimatedTimetable';

import VehicleModeFilter from './StopSearch/VehicleModeFilter';
import LineSelection from './StopSearch/LineSelection';
import StopSelection from './StopSearch/StopSelection';
import DateSelection from './StopSearch/DateSelection';
import SearchButton from './StopSearch/SearchButton';
import ResultsNumber from './StopSearch/ResultsNumber';
import Results from './StopSearch/Results';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const StopSearchPage = () => {
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

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid key='VehicleModeFilter' item xs={3}>
              <VehicleModeFilter />
            </Grid>
            <Grid key='DateSelection' item xs={3}>
              <DateSelection />
            </Grid>
            <Grid key='ResultsNumber' item xs={3}>
              <ResultsNumber />
            </Grid>
            <Grid key='SearchButton' item xs={3}>
              <SearchButton />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid key='LineSelection' item xs={6}>
              <LineSelection />
            </Grid>
            <Grid key='StopSelection' item xs={6}>
              <StopSelection />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Results />
    </Paper>
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
    maxStopArrivals: 5
  };

  return (
    <StopSearchProvider initialState={StopSearchInitialState}>
      <StopSearchPage />
    </StopSearchProvider>
  );
}

export default StopSearch;
