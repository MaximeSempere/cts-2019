import React, { useContext } from 'react';
import { StopSearchContext } from '../../providers/stopSearchProvider';
import { FormLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const ResultsNumber = () => {
  const { state: { maxStopArrivals, stop }, dispatch } = useContext(StopSearchContext);

  const handleChange = event => {
    dispatch({type: 'maxStopArrivalsSelection', data: {maxStopArrivals: event.target.value}});
  };

  const items = [
    3, 5, 10
  ];

  if (stop === null) {
    return <div></div>;
  }

  return (
    <div>
      <FormLabel component="legend">Nombre de resultat</FormLabel>
      <Select
          value={maxStopArrivals}
          onChange={handleChange}
        >
          {items.map((item) => <MenuItem value={item} key={item}>{item}</MenuItem>)}
        </Select>
    </div>
  );
}

export default ResultsNumber;
