import React, { useMemo } from 'react';

import { Workspace as WorkspaceRCL } from 'resource-workspace-rcl';
import useStyles from './style';
import { AppContext } from '../../context/AppContext';
import { columns } from '../../config/base';
import { ReferenceContext } from '../../context/ReferenceContext';
import { useSnackbar } from 'notistack';
import { Card } from '../../components';
import { useTranslation } from 'react-i18next';
import { getLayoutType } from '../../helper';

const breakpoints = { lg: 900, md: 700, sm: 500 };
function Workspace() {
  const {
    state: { appConfig, resourcesApp, resources, breakpoint },
    actions: { setAppConfig, setBreakpoint },
  } = React.useContext(AppContext);

  const {
    state: {
      referenceSelected: { bookId },
    },
    actions: { applyBooksFilter },
  } = React.useContext(ReferenceContext);
  const { t } = useTranslation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const layout = useMemo(() => {
    return { ...appConfig };
  }, [appConfig]);

  const onLayoutChange = (newLayout, _newLayout) => {
    const oldAppConfig = JSON.parse(localStorage.getItem('appConfig'));
    const type = getLayoutType(newLayout);
    const newAppConfig = {
      ...oldAppConfig,
      [type]: _newLayout,
    };
    localStorage.setItem('appConfig', JSON.stringify(newAppConfig));
    setAppConfig(newAppConfig[type]);
  };
  const mainResources = useMemo(() => {
    resourcesApp
      .filter((e) => appConfig.lg.map((e) => e.i).includes(e.name))
      .filter((e) =>
        [
          'Open Bible Stories',
          'Bible',
          'Aligned Bible',
          'Hebrew Old Testament',
          'Greek New Testament',
        ].includes(e.subject)
      );
  }, [resourcesApp, appConfig]);

  const compareMaterials = (resources, type) => {
    return (
      (resources.length >= 1 && !resources.map((e) => e.name).includes(type)) ||
      (resources.length > 1 && resources.map((e) => e.name).includes(type))
    );
  };
  const onClose = (index) => {
    if (compareMaterials(mainResources, index)) {
      setAppConfig((prev) => {
        const next = { ...prev };
        for (let k in next) {
          next[k] = next[k].filter((el) => el.i !== index);
        }

        return next;
      });
    } else {
      enqueueSnackbar(t('closeLastResource'), { variant: 'warning' });
    }
  };

  const cards = (appConfig[breakpoint.name] ?? []).map((item) => (
    <Card key={item.i} classes={classes} onClose={() => onClose(item.i)} type={item.i} />
  ));

  const availableBookList = useMemo(() => {
    const newBookList = [];
    if (bookId === 'obs') {
      newBookList.push('obs');
    } else {
      if (resources.length > 0) {
        resources.forEach((resource) => {
          if (resource.projects) {
            resource.projects.forEach((project) => {
              if (!newBookList.includes(project.identifier)) {
                newBookList.push(project.identifier);
              }
            });
          }
        });
      }
    }
    return newBookList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources.length, bookId]);

  React.useEffect(() => {
    applyBooksFilter(availableBookList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableBookList]);

  const onBreakpointChange = (name, cols) => {
    setBreakpoint({ name, cols });
  };

  return (
    <WorkspaceRCL
      gridMargin={[15, 15]}
      autoResize={true}
      totalGridUnits={12}
      classes={classes}
      layout={layout}
      breakpoints={breakpoints}
      rows={12}
      correctHeight={64}
      onBreakpointChange={onBreakpointChange}
      onLayoutChange={onLayoutChange}
      columns={columns}
    >
      {cards}
    </WorkspaceRCL>
  );
}

export default Workspace;
