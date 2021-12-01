import React, { useEffect, useState } from 'react';
import { Card, useContent } from 'translation-helps-rcl';
import axios from 'axios';
import { toJSON } from 'usfm-js';
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
  useEffect(() => {
    axios
      .get(
        server +
          '/' +
          resource.owner +
          '/' +
          type +
          '/raw/branch/' +
          'master' +
          '/08-RUT.usfm'
      )
      .then((res) => {
        console.log(toJSON(res.data));
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const content = useContent({
    chapter: chapter,
    projectId: bookId,
    branch: resource.tag,
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
