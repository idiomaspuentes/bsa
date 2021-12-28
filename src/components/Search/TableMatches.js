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

import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
  launchIcon: {
    cursor: 'pointer',
    fontSize: 20,
  },
});

export default function TableMatches({
  tableVerse,
  firstIndex,
  lastIndex,
  handleClickVerse,
  passages,
}) {
  const { t } = useTranslation();
  const classes = useStyles();

  const passagesVerses = passages
    .map((row) => (
      <TableRow key={row.reference}>
        <TableCell key={row.reference} size={'small'}>
          {row.reference}
        </TableCell>

        <TableCell key={row.key} size={'small'}>
          {row.text}
        </TableCell>
      </TableRow>
    ))
    .slice(firstIndex, lastIndex);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>{passages && passagesVerses}</TableBody>
      </Table>
    </TableContainer>
  );
}
