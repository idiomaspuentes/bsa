import React, { useState, useCallback } from 'react';

import { SendError } from '@texttree/user-notes-rcl';

import FinishDialog from './FinishDialog';
import ReportDialog from './ReportDialog';

import { Backdrop, CircularProgress } from '@material-ui/core';
import useStyles from './style';

function TypoReport({ referenceBlock = {}, open, setShowErrorReport }) {
  const [valueComment, setValueComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openFinishDialog, setOpenFinishDialog] = useState(false);
  const [errorFile, setErrorFile] = useState('');

  const handleChange = (e) => {
    setValueComment(e.target.value);
  };

  const { bookId, chapter, verse, resource, text } = referenceBlock;

  const handleCloseFinishDialog = useCallback(() => {
    setOpenFinishDialog(false);
  }, []);
  console.log('TypoReport');

  const handleSend = useCallback(() => {
    setOpenBackdrop(true);
    setShowErrorReport(false);
    SendError({
      reference: chapter + ':' + verse,
      bookId: bookId,
      resource: resource,
      serverLink: process.env.REACT_APP_SERVER_LINK,
      fields: {
        Note: valueComment,
        Quote: text,
      },
    })
      .then((res) => {
        setOpenBackdrop(false);
        if (res.success) {
          setValueComment('');
          setErrorFile(res.file);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCancel = useCallback(() => {
    setShowErrorReport(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  return (
    <>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ReportDialog
        classname={'intro-reportDialog'}
        open={open}
        valueComment={valueComment}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSend={handleSend}
        errorMessage={errorMessage}
      />
      <FinishDialog
        errorFile={errorFile}
        open={openFinishDialog}
        onClose={handleCloseFinishDialog}
      />
    </>
  );
}
export default React.memo(TypoReport);
