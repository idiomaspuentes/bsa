import React, { useEffect, useState } from 'react';
import { Card, useContent } from 'translation-helps-rcl';
import USFMContent from './USFMContent';
import { CircularProgressUI } from '../../components';
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
  const [isLoading, setIsLoading] = useState(false);
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
  useEffect(() => {
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
      {isLoading ? (
        <CircularProgressUI />
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
