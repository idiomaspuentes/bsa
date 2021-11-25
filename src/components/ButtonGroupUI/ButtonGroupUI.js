import React from 'react';

import { useStyles, useButtonStyles } from './style';
import { ButtonGroup, Button } from '@material-ui/core';

function ButtonGroupUI({ buttons = [], buttonGroupProps = {}, style = {} }) {
  const classes = useStyles();
  const classesButton = useButtonStyles();
  console.log('ButtonGroup', buttons);
  return (
    <div className={classes.root} style={style}>
      <ButtonGroup {...buttonGroupProps}>
        {buttons.map((el, index) => (
          <Button key={index} className={classesButton.root} onClick={el.onClick}>
            {el.title}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
export default React.memo(ButtonGroupUI);
