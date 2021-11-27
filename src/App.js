import React from 'react';

import {
  Shortcut,
  Swipes,
  Intro,
  TypoReport,
  SubMenuBar,
  StartDialog,
  Workspace,
} from './components';

import './styles/app.css';

//const Intro = React.lazy(() => import('./components/Intro/Intro'));
//const Card = React.lazy(() => import('./components/Card/Card'));
//const TypoReport = React.lazy(() => import('./components/TypoReport/TypoReport'));
//const SubMenuBar = React.lazy(() => import('./components/SubMenuBar/SubMenuBar'));

export default function App() {
  Shortcut();
  Swipes();

  return (
    <>
      <StartDialog />
      <Intro />
      <SubMenuBar />
      <TypoReport />

      <Workspace />
    </>
  );
}
