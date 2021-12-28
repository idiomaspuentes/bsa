import React, { useEffect, useState } from 'react';
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
  searchBookCodes,
  documents,
}) {
  console.log(documents);
  const { bookId } = referenceSelected;
  const { languageId, name, owner } = resourceSearch;

  const docSetId = `${owner}/${name}`;
  const bookCode = bookId.toUpperCase();
  const verbose = true;

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
  // console.log(importErrors);

  const { passages } = useSearchForPassagesByBookCodes({
    proskomma,
    stateId,
    text: searchText,
    docSetId,
    bookCodes: searchBookCodes,
    // blocks: true,

    verbose,
  });

  return { passages };
}
