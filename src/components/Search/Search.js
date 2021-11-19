import React, { useContext } from 'react';

import { useProskomma, useQuery } from 'proskomma-react-hooks';

import ReactJson from 'react-json-view';
import DialogUI from '../DialogUI/DialogUI';
import { Button } from '@material-ui/core';
import { useContent } from 'translation-helps-rcl';

import { ReferenceContext } from '../../context';

function Search() {
  const {
    state: { referenceSelected },
  } = useContext(ReferenceContext);

  const { bookId, chapter, verse } = referenceSelected;

  const usfm = useContent({
    chapter: chapter,
    projectId: bookId,
    branch: 'master',
    languageId: 'ru',
    resourceId: 'rlob',
    owner: 'bsa',
    server: 'https://git.door43.org',
  });

  const [open, setOpen] = React.useState(false);
  //   const usfm = `
  // \\id 3JN
  // \\ide UTF-8
  // \\h 3 Jean
  // \\toc1 3 Jean
  // \\mt 3 Jean

  // \\s5
  // \\c 1
  // \\p
  // \\v 1 L'ancien au bien-aimé Gaius, que j'aime dans la vérité.
  // \\v 2 Bien-aimé, je prie que tu pospères en toutes choses et sois en santé, juste comme prospère ton âme.
  // `;

  const _documents = usfm
    ? [
        {
          selectors: {
            org: 'bsa',
            lang: 'ru',
            abbr: 'rlob',
          },
          bookId: bookId,
          data: usfm.markdown,
        },
      ]
    : null;

  const query = `{
  processor
  packageVersion
  documents(withBook: "${bookId.toUpperCase()}") {
    cv (chapter:"${chapter}" verses:["${verse}"]) 
      { text }
  }
}`;

  const {
    stateId,
    proskomma,
    documents,
    errors: proskommaErrors,
  } = useProskomma({
    documents: _documents,
    serialize: false,
    verbose: true,
  });

  const {
    stateId: queryStateId,
    query: queryRun,
    data,
    errors: queryErrors,
  } = useQuery({
    proskomma,
    stateId,
    query,
  });

  console.log(data);

  const json = {
    queryStateId,
    // documents,
    query: queryRun,
    data,
    errors: [...proskommaErrors, ...queryErrors],
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Proskomma
      </Button>
      <DialogUI open={open} onClose={onClose} titleDialogClose>
        <ReactJson
          style={{ maxHeight: '500px', overflow: 'scroll' }}
          src={json}
          theme="monokai"
        />
      </DialogUI>
    </>
  );
}

export default Search;
