import { useState, useEffect } from 'react';

import {
  useProskomma,
  useImport,
  useSearchForPassagesByBookCodes,
} from 'proskomma-react-hooks';

export default function useSearch({
  resourceSearch,
  referenceSelected,
  searchText,
  _usfm,
}) {
  const { bookId } = referenceSelected;
  const { languageId, name, owner } = resourceSearch;

  const docSetId = `${owner}/${name}`;
  const bookCode = bookId.toUpperCase();
  const verbose = true;

  const documents = [
    {
      selectors: {
        org: owner,
        lang: languageId,
        abbr: name.split('_')[1],
      },
      bookCode: '1ti'.toUpperCase(),
      data: _usfm['1ti'],
    },
    {
      selectors: {
        org: owner,
        lang: languageId,
        abbr: name.split('_')[1],
      },
      bookCode: '2ti'.toUpperCase(),
      data: _usfm['2ti'],
    },
    {
      selectors: {
        org: owner,
        lang: languageId,
        abbr: name.split('_')[1],
      },
      bookCode: 'tit'.toUpperCase(),
      data: _usfm['tit'],
    },
  ];

  const { stateId, newStateId, proskomma } = useProskomma({
    verbose,
  });
  const { errors: importErrors } = useImport({
    proskomma,
    stateId,
    newStateId,
    documents,
    verbose,
  });
  console.log(importErrors);

  const { passages } = useSearchForPassagesByBookCodes({
    proskomma,
    stateId,
    text: searchText,
    docSetId,
    bookCodes: ['1ti', '2ti', 'tit'],

    verbose,
  });

  console.log(passages);

  return { passages };
}
