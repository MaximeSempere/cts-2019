import React, { useContext } from 'react';
import { StopSearchContext } from '../../providers/stopSearchProvider';
import Select from 'react-select';
import { FormLabel } from '@material-ui/core';

const StopSelection = () => {
  const { state: { stops, stop, line }, dispatch } = useContext(StopSearchContext);

  const options = stops.filter((stop) => {
    if (stop.LineRef === line) {
      return true;
    }
    return false;
  }).map(stop => ({
    value: stop.StopPointRef,
    label: stop.VehicleMode+' '+stop.LineRef+' - '+stop.StopPointName+ ' => '+stop.DestinationName
  }));

  const value = options.find(element => {
    return element.value === stop;
  });

  const handleChange = selected => {
    dispatch({type: 'StopSelection', data: {stop: selected.value}});
  };

  const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };

  let select = '';
  if (options.length > 0) {
    select =
      <div>
        <FormLabel component="legend">Arrêt</FormLabel>
        <Select
          value={value}
          onChange={handleChange}
          options={options}
          styles={selectStyles}
        />
      </div>
  }

  return (
    <div>
      {select}
    </div>
  );
}

export default StopSelection;
