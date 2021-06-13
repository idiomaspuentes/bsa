import React, { useContext, useState } from 'react';

import { SendError } from 'tsv-frontend';
import { AppContext } from '../../App.context';

import FinishDialog from './FinishDialog';
import ReportDialog from './ReportDialog';

import { Backdrop, CircularProgress } from '@material-ui/core';

import useStyles from './style';

export default function TypoReport() {
  const { state, actions } = useContext(AppContext);
  const { showErrorReport, referenceBlock } = state;
  const { setShowErrorReport } = actions;

  const [valueComment, setValueComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openFinishDialog, setOpenFinishDialog] = useState(false);

  const handleChange = (e) => {
    setValueComment(e.target.value);
  };

  const handleCloseFinishDialog = () => {
    setOpenFinishDialog(false);
  };

  const handleSend = () => {
    setOpenBackdrop(true);
    setShowErrorReport(false);
    SendError({
      reference: referenceBlock?.chapter + ':' + referenceBlock?.verse,
      bookId: referenceBlock?.bookId,
      resource: referenceBlock?.type,
      serverLink: 'http://localhost:4000/send',
      fields: {
        Note: valueComment,
        Quote: referenceBlock?.text,
      },
    })
      .then((res) => {
        console.log('res', res);
        setOpenBackdrop(false);
        if (res.success) {
          setValueComment('');
          setOpenFinishDialog(true);
        } else {
          setShowErrorReport(true);
          setErrorMessage(res.message);
        }
      })
      .catch((err) => {
        console.log('err', err);
        setErrorMessage(err.message);
        setShowErrorReport(true);
        setOpenBackdrop(false);
      });
  };

  function handleCancel() {
    setShowErrorReport(false);
  }
  const classes = useStyles();

  return (
    <>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ReportDialog
        open={showErrorReport}
        valueComment={valueComment}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSend={handleSend}
        errorMessage={errorMessage}
      />
      <FinishDialog open={openFinishDialog} onClose={handleCloseFinishDialog} />
    </>
  );
}
