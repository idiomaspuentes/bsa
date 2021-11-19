import React, { useContext, useState } from 'react';

import { SendError } from '@texttree/user-notes-rcl';

import { AppContext, ReferenceContext } from '../../context';
import FinishDialog from './FinishDialog';
import ReportDialog from './ReportDialog';

import { Backdrop, CircularProgress } from '@material-ui/core';
import useStyles from './style';

export default function TypoReport() {
  const {
    state: { showErrorReport },
    actions: { setShowErrorReport, setErrorFile },
  } = useContext(AppContext);

  const {
    state: { referenceBlock },
  } = useContext(ReferenceContext);

  const [valueComment, setValueComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openFinishDialog, setOpenFinishDialog] = useState(false);

  const handleChange = (e) => {
    setValueComment(e.target.value);
  };

  const { bookId, chapter, verse, resource, text } = referenceBlock;

  const handleCloseFinishDialog = () => {
    setOpenFinishDialog(false);
  };

  const handleSend = () => {
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
          setOpenFinishDialog(true);
          setShowErrorReport(true);
          setErrorMessage(res.message);
        }
      })
      .catch((err) => {
        console.log('err', err);
        setOpenFinishDialog(true);
        setErrorMessage(err.message);
        setShowErrorReport(true);
        setOpenBackdrop(false);
      });
  };

  const handleCancel = () => {
    setShowErrorReport(false);
  };
  const classes = useStyles();

  return (
    <>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ReportDialog
        classname={'intro-reportDialog'}
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
