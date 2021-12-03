import React from 'react';

import { useTranslation } from 'react-i18next';

import { DialogUI } from '../../components';
import logo from './friends.png';
import { Link } from '@material-ui/core';

function FinishDialog({ open, onClose, errorFile }) {
  const { t } = useTranslation();

  return (
    <DialogUI
      primary={{ text: t('Ok'), onClick: onClose }}
      onClose={onClose}
      title={t('Done')}
      open={open}
    >
      <div style={{ textAlign: 'center' }}>
        <div>
          <img alt="logo friends" src={logo} />
        </div>
        {t('Thanks_report1')} <br />
        {t('Thanks_report2')} <br /> <br />
        {t('See_logs1')} <br />
        <Link href={errorFile} target="_blank">
          {t('See_logs2')}
        </Link>
      </div>
    </DialogUI>
  );
}

export default FinishDialog;
