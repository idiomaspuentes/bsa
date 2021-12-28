import React from 'react';

import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core';

import LaunchIcon from '@material-ui/icons/Launch';

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
  launchIcon: {
    cursor: 'pointer',
    fontSize: 20,
  },
});

export default function TableMatches({ passages, firstIndex, lastIndex }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {passages
            .map((row, index) => (
              <TableRow key={row.reference + index}>
                <TableCell size={'small'}>{row.reference}</TableCell>
                <TableCell size={'small'}>{row.text}</TableCell>
                <TableCell size={'small'}>
                  <LaunchIcon className={classes.launchIcon} />
                </TableCell>
              </TableRow>
            ))
            .slice(firstIndex, lastIndex)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
