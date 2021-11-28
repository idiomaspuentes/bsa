import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useCircularStyles } from './style';
function CircularProgressUI({ size = 100, color = 'primary' }) {
  const classesCircular = useCircularStyles();
  return (
    <div className={classesCircular.root}>
      <CircularProgress color={color} size={size} />
    </div>
  );
}

export default CircularProgressUI;
