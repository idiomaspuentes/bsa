import React, { useContext, useEffect, useState } from 'react';

import { Workspace } from 'resource-workspace-rcl';
import { SnackbarProvider } from 'notistack';

import { AppContext } from './App.context';
import { SubMenuBar, Card, TypoReport } from './components';
import Shortcut from './KeyboardShortcut';

import './styles/app.css';
import useStyles from './style';

export default function App() {
  const { state, actions } = useContext(AppContext);
  const { appConfig, referenceSelected, resourcesApp } = state;
  const { setAppConfig } = actions;
  const classes = useStyles();
  const layout = {
    absolute: appConfig,
  };
  const [rowHeight, setRowHeight] = useState(30);
  useEffect(() => {
    setRowHeight((window.innerHeight - 64) / 10 - 17);
  }, []);
  Shortcut();
  const onLayoutChange = (newLayout) => {
    localStorage.setItem('appConfig', JSON.stringify(newLayout));
    setAppConfig(newLayout);
  };
  const mainResources = resourcesApp
    .filter((e) => appConfig.map((e) => e.i).includes(e.name))
    .filter((e) =>
      [
        'Open Bible Stories',
        'Bible',
        'Aligned Bible',
        'Hebrew Old Testament',
        'Greek New Testament',
      ].includes(e.subject)
    );

  const compareMaterials = (resources, type) => {
    return (
      (resources.length >= 1 && !resources.map((e) => e.name).includes(type)) ||
      (resources.length > 1 && resources.map((e) => e.name).includes(type))
    );
  };
  const onClose = (index) => {
    if (compareMaterials(mainResources, index)) {
      setAppConfig((prev) => prev.filter((el) => el.i !== index));
    }
  };
  const cards = appConfig.map((item) => (
    <Card
      classes={classes}
      key={item.i}
      onClose={() => onClose(item.i)}
      reference={referenceSelected}
      type={item.i}
    />
  ));

  return (
    <SnackbarProvider maxSnack={3}>
      <SubMenuBar />
      <TypoReport />
      <Workspace
        gridMargin={[15, 15]}
        rowHeight={rowHeight}
        totalGridUnits={12}
        classes={classes}
        layout={layout}
        onLayoutChange={onLayoutChange}
      >
        {cards}
      </Workspace>
    </SnackbarProvider>
  );
}
