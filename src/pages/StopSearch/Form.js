import React, {useContext, useEffect} from 'react';

import VehicleModeFilter from './VehicleModeFilter';
import LineSelection from './LineSelection';
import StopSelection from './StopSelection';
import DateSelection from './DateSelection';
import SearchButton from './SearchButton';
import Results from './Results';
import Loading from './Loading';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import { StopSearchContext } from '../../providers/stopSearchProvider';

import stopMonitoring from '../../services/stopMonitoring';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const Form = ( {match} ) => {
  const classes = useStyles();
  const { dispatch } = useContext(StopSearchContext);

  useEffect(() => {
    dispatch({type: 'routeParams', data: {match: match}});

    dispatch({type: 'loadResult', data: {
      match: match,
      load: (stop, line, date, maxStopArrivals) => {
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
      }
    }});
  }, [dispatch, match]);

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid key='VehicleModeFilter' item xs={6}>
              <VehicleModeFilter />
            </Grid>
            <Grid key='DateSelection' item xs={6}>
              <DateSelection />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid key='LineSelection' item xs={12}>
              <LineSelection />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid key='LineSelection' item xs={12}>
              <StopSelection />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid key='LineSelection' item xs={12} style={{textAlign: "center"}}>
              <SearchButton />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid key='LineSelection' item xs={12} style={{textAlign: "center"}}>
              <Loading />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Results />
    </Paper>
  );
}


export default withRouter(Form);
