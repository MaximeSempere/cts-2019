import React, { useContext } from 'react';
import { StopSearchContext } from '../../providers/stopSearchProvider';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const DateSelection = ( {history} ) => {
  const { state: { stop, line, VehicleMode }, dispatch } = useContext(StopSearchContext);

  const handleChange = () => {
    dispatch({type: 'loading'});

    history.push('/'+VehicleMode.bus+'/'+VehicleMode.tram+'/'+line+'/'+stop);
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

export default withRouter(DateSelection);
