import React, { useState, useEffect, useContext } from 'react';

import { ResourcesContextProvider } from 'scripture-resources-rcl';

import { useTranslation } from 'react-i18next';
import { ReferenceContext } from './ReferenceContext';
import { getResources, getBookList, checkLSVal, getLayoutType } from '../helper';
import {
  defaultTplBible,
  defaultTplOBS,
  languages,
  bibleList,
  server,
} from '../config/base';

export const AppContext = React.createContext();

const _currentLanguage = checkLSVal('i18nextLng', languages[0]);
const _fontSize = parseInt(localStorage.getItem('fontSize'));

export function AppContextProvider({ children }) {
  const {
    state: { referenceSelected },
    actions: { setNewBookList },
  } = useContext(ReferenceContext);

  const [currentLanguage, setCurrentLanguage] = useState(_currentLanguage);
  const [appConfig, setAppConfig] = useState(
    () =>
      checkLSVal(
        'appConfig',
        {
          bible: defaultTplBible[_currentLanguage],
          obs: defaultTplOBS[_currentLanguage],
        },
        'object',
        'bible'
      )[referenceSelected.bookId === 'obs' ? 'obs' : 'bible']
  );

  const [breakpoint, setBreakpoint] = useState({ name: 'lg', cols: 12 });
  /** TODO Create ResourceContext
   * 1. Get information about resources ( like available bookId) from /Chapter  - content.resources.project.
   * 2. Put all states about resources in ResourceContext.
   * 3. Maybe make availableBookList in ResourceContext
   */
  const [resourcesApp, setResourcesApp] = useState(() => {
    return checkLSVal('resourcesApp', [], 'object');
  });

  const _resourceLinks = getResources(appConfig, resourcesApp);
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);
  const [showBookSelect, setShowBookSelect] = useState(false);
  const [showChapterSelect, setShowChapterSelect] = useState(false);

  const [errorFile, setErrorFile] = useState('');
  const [fontSize, setFontSize] = useState(_fontSize ? _fontSize : 100);
  const [loadIntro, setLoadIntro] = useState(false);
  const [openStartDialog, setOpenStartDialog] = useState(() => {
    return checkLSVal('startDialog', true, 'boolean');
  });
  const [openMainMenu, setOpenMainMenu] = useState(false);
  const [languageResources, setLanguageResources] = useState(() => {
    return checkLSVal('languageResources', ['en', 'el-x-koine', 'hbo'], 'object');
  });

  const config = { server };
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    const type = getLayoutType(appConfig.lg);
    const newType = referenceSelected.bookId === 'obs' ? 'obs' : 'bible';
    if (type !== newType) {
      setAppConfig(JSON.parse(localStorage.getItem('appConfig'))[newType]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referenceSelected.bookId]);

  useEffect(() => {
    setResourceLinks(getResources(appConfig, resourcesApp));
  }, [appConfig, resourcesApp, breakpoint]);

  useEffect(() => {
    setNewBookList(getBookList(bibleList, t), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem('resourcesApp', JSON.stringify(resourcesApp));
  }, [resourcesApp]);

  useEffect(() => {
    localStorage.setItem('languageResources', JSON.stringify(languageResources));
  }, [languageResources]);

  useEffect(() => {
    localStorage.setItem('loadIntro', loadIntro);
  }, [loadIntro]);

  useEffect(() => {
    localStorage.setItem('startDialog', openStartDialog);
  }, [openStartDialog]);

  const value = {
    state: {
      appConfig,
      breakpoint,
      currentLanguage,
      errorFile,
      fontSize,
      loadIntro,
      languageResources,
      openMainMenu,
      openStartDialog,
      resourceLinks,
      resourcesApp,
      resources,
      _resourceLinks,
      showBookSelect,
      showChapterSelect,
    },
    actions: {
      setAppConfig,
      setBreakpoint,
      setCurrentLanguage,
      setErrorFile,
      setFontSize,
      setLoadIntro,
      setLanguageResources,
      setOpenMainMenu,
      setOpenStartDialog,
      setResourceLinks,
      setResourcesApp,
      setResources,
      setShowBookSelect,
      setShowChapterSelect,
    },
  };

  return (
    <AppContext.Provider value={value}>
      <ResourcesContextProvider
        reference={{
          bookId: referenceSelected.bookId,
          chapter: referenceSelected.chapter,
        }}
        resourceLinks={resourceLinks}
        defaultResourceLinks={_resourceLinks}
        onResourceLinks={setResourceLinks}
        resources={resources}
        onResources={setResources}
        config={config}
      >
        {children}
      </ResourcesContextProvider>
    </AppContext.Provider>
  );
}
