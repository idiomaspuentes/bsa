import React from 'react';
import { Card, useContent } from 'translation-helps-rcl';
import USFMContent from './USFMContent';
import { CircularProgress } from '@material-ui/core';
import { useCircularStyles } from './style';

export default function Chapter({
  title,
  classes,
  onClose,
  resource,
  type,
  reference,
  fontSize,
  server,
}) {
  const classesCircular = useCircularStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const { bookId, chapter } = reference;
  const content = useContent({
    chapter: chapter,
    projectId: bookId,
    branch: resource.branch,
    languageId: resource.languageId,
    resourceId: type.split('_')[1],
    owner: resource.owner,
    server,
  });
  const { initialized, loading } = content?.resourceStatus;
  React.useEffect(() => {
    setIsLoading(!(initialized && !loading));
  }, [initialized, loading]);

  return (
    <Card
      closeable
      onClose={() => onClose(type)}
      title={title}
      type={type}
      id={type}
      classes={classes}
      fontSize={fontSize}
    >
      {' '}
      {isLoading ? (
        <div className={classesCircular.root}>
          <CircularProgress color="primary" size={100} />
        </div>
      ) : (
        <USFMContent
          fontSize={fontSize}
          content={content}
          type={type}
          reference={reference}
        />
      )}
    </Card>
  );
}
