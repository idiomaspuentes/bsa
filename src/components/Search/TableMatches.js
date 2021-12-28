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
  passages,
  firstIndex,
  lastIndex,
  handleClickVerse,
}) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {passages
            .map((row) => (
              <TableRow key={row.reference}>
                <TableCell key={row.reference} size={'small'}>
                  {row.reference}
                </TableCell>
                <TableCell key={row.reference} size={'small'}>
                  {row.text}
                </TableCell>
                <TableCell key={row.reference} size={'small'}>
                  <LaunchIcon
                    key={row.reference}
                    // onClick={() => handleClickVerse(row.keyChapter, row.keyVerse)} TODO - не работает
                    className={classes.launchIcon}
                  />
                </TableCell>
              </TableRow>
            ))
            .slice(firstIndex, lastIndex)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
