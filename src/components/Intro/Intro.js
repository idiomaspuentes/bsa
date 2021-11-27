import React, { useContext, useRef, useState, useEffect } from 'react';

import { Steps } from 'intro.js-react';
import { useTranslation } from 'react-i18next';
import { ContextMenu } from '../../components';

import { AppContext, ReferenceContext } from '../../context';

import 'intro.js/introjs.css';

const initialPosition = {
  left: null,
  top: null,
};

function Intro() {
  const [introContextMenuPosition, setIntroContextMenuPosition] =
    useState(initialPosition);
  const [currentVersePosition, setCurrentVersePosition] = useState(initialPosition);
  const [, setIntroContextMenuOpen] = useState(false);
  const { t } = useTranslation();
  const stepsRef = useRef();
  console.log('Intro');
  const {
    state: {
      referenceSelected: { bookId },
    },
  } = useContext(ReferenceContext);

  const {
    actions: {
      setShowBookSelect,
      setShowChapterSelect,
      setShowErrorReport,
      setLoadIntro,
      setOpenMainMenu,
    },
    state: { loadIntro, showChapterSelect },
  } = useContext(AppContext);

  const steps = [
    {
      intro: t('introStart'),
    },
    {
      element: '.intro-appBar',
      intro: t('introAppBar'),
    },
    {
      element: bookId !== 'obs' ? '.intro-bookList' : '.intro-obsSelect',
      intro: bookId !== 'obs' ? t('introBookList') : t('introObsSelect'),
    },
    {
      element: '.intro-chapterList',
      intro: bookId !== 'obs' ? t('introChapterList') : t('introObsList'),
    },
    {
      intro: bookId !== 'obs' ? t('introShortCuts') : t('introObsShortCuts'),
    },
    {
      element: '.react-grid-layout',
      intro: t('introWorkSpace'),
    },
    {
      element: '.intro-card',
      intro: t('introCard'),
    },
    {
      element: '.verse',
      intro: t('introVerse'),
    },
    {
      element: '.intro-contextMenu',
      intro: t('introContextMenu'),
    },
    {
      element: '.intro-reportDialog',
      intro: t('introReportDialog'),
    },
    {
      element: '.intro-hamburger',
      intro: t('introHamburger'),
    },
  ];
  useEffect(() => {
    if (document.querySelector('.current')) {
      const { top, left } = document.querySelector('.current').getBoundingClientRect();
      setCurrentVersePosition({ top, left });
    }
    // eslint-disable-next-line
  }, [showChapterSelect]); //TODO надо придумать другую зависимость

  const onBeforeChange = (stepIndex) => {
    switch (String(stepIndex)) {
      case '0':
        break;
      case '1':
        setShowBookSelect(false);

        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '2':
        bookId !== 'obs' && setShowBookSelect(true);
        setShowChapterSelect(false);
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '3':
        setShowBookSelect(false);
        setShowChapterSelect(true);
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '4':
        setShowChapterSelect(false);
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '5':
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '6':
        setIntroContextMenuPosition(initialPosition);
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '7':
        setIntroContextMenuPosition(currentVersePosition);
        document.querySelector('.intro-contextMenu').style.opacity = 0;
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '8':
        setShowErrorReport(false);
        document.querySelector('.intro-contextMenu').style.opacity = 1;
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '9':
        setShowErrorReport(true);
        setOpenMainMenu(true);
        document.querySelector('.intro-hamburger').style.opacity = 0;
        setIntroContextMenuPosition(currentVersePosition);
        document.querySelector('.intro-contextMenu').style.opacity = 0;
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '10':
        setIntroContextMenuPosition(initialPosition);
        setShowErrorReport(false);
        document.querySelector('.intro-hamburger').style.opacity = 1;
        stepsRef.current.updateStepElement(stepIndex);
        break;
      default:
        break;
    }
  };
  const onExit = () => {
    setLoadIntro(false);
    setOpenMainMenu(false);
    setIntroContextMenuOpen(false);
    setShowErrorReport(false);
    setShowChapterSelect(false);
    setShowBookSelect(false);
  };
  const options = {
    nextLabel: t('Next'),
    prevLabel: t('Previous'),
    doneLabel: t('Done'),
    tooltipClass: 'tooltipClass',
    highlightClass: 'highlightClass',
    helperElementPadding: 0,
    nextToDone: true,
    hidePrev: true,
    overlayOpacity: 0.6,
    exitOnEsc: false,
    exitOnOverlayClick: false,
    showBullets: false,
    disableInteraction: true,
  };

  return (
    <>
      <Steps
        enabled={loadIntro}
        steps={steps}
        ref={stepsRef}
        initialStep={0}
        onBeforeChange={onBeforeChange}
        onExit={onExit}
        options={options}
      />
      <ContextMenu
        PopoverClasses={{ paper: 'intro-contextMenu' }}
        position={introContextMenuPosition}
      />
    </>
  );
}

export default Intro;
