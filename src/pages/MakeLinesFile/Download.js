import React from 'react';
import { Button } from '@material-ui/core';

const Download = ( {json, filename, label} ) => {
  if (json === '{}') {
    return <div></div>
  }

  const href = 'data:application/json;charset=utf-8,' + encodeURIComponent(json);

  return (
    <Button href={href} download={filename} color="primary" variant="contained">
        {label}
    </Button>
  );
}


export default Download;
