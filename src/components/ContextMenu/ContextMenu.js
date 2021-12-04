import React, { useContext, useState } from 'react';

import { Menu, MenuItem } from '@material-ui/core';
import { ReferenceContext } from '../../context';
import { TypoReport } from '../../components';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

const initialPosition = {
  left: null,
  top: null,
};

function ContextMenu({ position, setPosition, PopoverClasses, showErrorIntro }) {
  const { t } = useTranslation();

  const [showErrorReport, setShowErrorReport] = useState(showErrorIntro);
  const {
    state: { referenceBlock },
  } = useContext(ReferenceContext);

  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    setShowErrorReport(showErrorIntro);
  }, [showErrorIntro]);
  const handleContextClose = () => {
    setPosition(initialPosition);
  };

  const anchorPosition =
    position?.top !== null && position?.left !== null
      ? { top: position.top, left: position.left }
      : undefined;

  const handleOpenError = () => {
    setShowErrorReport(true);
    setPosition(initialPosition);
  };

  const copyToClipboard = (text) => {
    return navigator.clipboard.writeText(text).then(
      () => {
        handleContextClose();
        enqueueSnackbar(t('copied_success'), { variant: 'success' });
      },
      (err) => {
        handleContextClose();
        enqueueSnackbar(t('copied_error'), { variant: 'error' });
      }
    );
  };

  const handleReferenceToClipboard = () => {
    copyToClipboard(
      `${t(referenceBlock.bookId)} ${referenceBlock.chapter}:${referenceBlock.verse}`
    );
  };

  const handleVerseToClipboard = () => {
    copyToClipboard(
      `${referenceBlock.text} (${t(referenceBlock.bookId)} ${referenceBlock.chapter}:${
        referenceBlock.verse
      })`
    );
  };

  return (
    <>
      <Menu
        keepMounted
        open={position.top !== null}
        onClose={handleContextClose}
        anchorPosition={anchorPosition}
        PopoverClasses={PopoverClasses}
        anchorReference="anchorPosition"
      >
        <MenuItem onClick={handleOpenError}>{t('Error_report')}</MenuItem>
        <MenuItem onClick={handleVerseToClipboard}>
          {t('Copy_verse_to_clipboard')}
        </MenuItem>
        <MenuItem onClick={handleReferenceToClipboard}>
          {t('Copy_reference_to_clipboard')}
        </MenuItem>
      </Menu>

      <TypoReport
        referenceBlock={referenceBlock}
        open={showErrorReport}
        setShowErrorReport={setShowErrorReport}
        showErrorIntro={showErrorIntro}
      />
    </>
  );
}

export default ContextMenu;
