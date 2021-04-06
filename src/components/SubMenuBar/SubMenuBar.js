import React, { useState } from 'react';

import { BookSelect, ChapterSelect } from '../../components';

import { AppBar, Toolbar, Fab, MenuItem, Menu } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import { useTranslation } from 'react-i18next';

import { getUniqueResources } from '../../helper';

function SubMenuBar(props) {
  const {
    setAppConfig,
    referenceSelected,
    setReferenceSelected,
    appConfig,
    showBookSelect,
    setShowBookSelect,
    showChapterSelect,
    setShowChapterSelect,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const uniqueResources = getUniqueResources(appConfig);
  const { t } = useTranslation();

  const handleAddNew = (item) => {
    setAppConfig((prev) => prev.concat({ w: 4, h: 3, x: 0, y: 99, i: item }));

    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Toolbar>
            <Fab color="primary" aria-label="add" onClick={handleClick}>
              <AddIcon />
            </Fab>
            <Menu
              color="transparent"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {Object.keys(uniqueResources).map((keyName, index) => (
                <MenuItem key={index} onClick={() => handleAddNew(keyName)}>
                  {t(keyName)}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
          <Toolbar style={{ margin: '0 auto' }}>
            <BookSelect
              referenceSelected={referenceSelected}
              setReferenceSelected={setReferenceSelected}
              showBookSelect={showBookSelect}
              setShowBookSelect={setShowBookSelect}
              setShowChapterSelect={setShowChapterSelect}
            />
            <ChapterSelect
              referenceSelected={referenceSelected}
              setReferenceSelected={setReferenceSelected}
              showChapterSelect={showChapterSelect}
              setShowChapterSelect={setShowChapterSelect}
            />
          </Toolbar>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default SubMenuBar;
