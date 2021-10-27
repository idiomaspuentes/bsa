import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';

function Base({ children, widthBase }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(widthBase),
        minHeight: theme.spacing(50), // TODO When languageResources have more items - make hight flexible or use Vertical Stepper
      },
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0}>{children}</Paper>
    </div>
  );
}

export default Base;
