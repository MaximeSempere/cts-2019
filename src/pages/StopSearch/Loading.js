import React,  { useContext } from 'react';
import { StopSearchContext } from '../../providers/stopSearchProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { withTheme } from '@material-ui/styles';

const Loading = (props) => {
  const { state: { loading } } = useContext(StopSearchContext);

  if (!loading) {
    return <div></div>
  }

  return (
    <FontAwesomeIcon icon={faSpinner} pulse size="4x" color={props.theme.palette.primary.main} />
  );
}

export default withTheme(Loading);
