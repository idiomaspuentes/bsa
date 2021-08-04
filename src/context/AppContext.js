import React, { useState, useEffect, useContext } from 'react';

import { ResourcesContextProvider } from 'scripture-resources-rcl';

import { useTranslation } from 'react-i18next';
import { ReferenceContext } from './ReferenceContext';
import { getResources, getBookList } from '../helper';
import { server, defaultTplBible, languages, bibleList } from '../config/base';

export const AppContext = React.createContext();

const _currentLanguage = localStorage.getItem('i18nextLng')
  ? localStorage.getItem('i18nextLng')
  : languages[0];

const _appConfig = localStorage.getItem('appConfig')
  ? JSON.parse(localStorage.getItem('appConfig'))
  : defaultTplBible[_currentLanguage];

let _resourcesApp = localStorage.getItem('resourcesApp')
  ? JSON.parse(localStorage.getItem('resourcesApp'))
  : [];

let _fontSize = parseInt(localStorage.getItem('fontSize'));

const config = { server };

export function AppContextProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(_currentLanguage);
  const [appConfig, setAppConfig] = useState(_appConfig);
  const [resourcesApp, setResourcesApp] = useState(_resourcesApp);

  const _resourceLinks = getResources(appConfig, resourcesApp);
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);
  const [showBookSelect, setShowBookSelect] = useState(true);
  const [showChapterSelect, setShowChapterSelect] = useState(false);
  const [showErrorReport, setShowErrorReport] = useState(false);
  const [fontSize, setFontSize] = useState(_fontSize ? _fontSize : 100);

  const { t } = useTranslation();

  localStorage.setItem('fontSize', fontSize);
  const {
    state: { referenceSelected },
    actions: { setNewBookList },
  } = useContext(ReferenceContext);

  useEffect(() => {
    setResourceLinks(getResources(appConfig, resourcesApp));
  }, [appConfig, resourcesApp]);

  useEffect(() => {
    setNewBookList(getBookList(bibleList, t), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem('resourcesApp', JSON.stringify(resourcesApp));
  }, [resourcesApp]);

  const value = {
    state: {
      appConfig,
      resourceLinks,
      resourcesApp,
      resources,
      _resourceLinks,
      showBookSelect,
      showChapterSelect,
      showErrorReport,
      fontSize,
      currentLanguage,
    },
    actions: {
      setAppConfig,

      setResourceLinks,
      setResourcesApp,
      setResources,
      setShowBookSelect,
      setShowChapterSelect,
      setShowErrorReport,
      setFontSize,
      setCurrentLanguage,
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
