import {
  useProskomma,
  useImport,
  useSearchForPassagesByBookCodes,
} from 'proskomma-react-hooks';

export default function useSearch({ resourceSearch, searchText, _usfm }) {
  const { languageId, name, owner } = resourceSearch;

  const docSetId = `${owner}/${name}`;
  const verbose = true;
  let bookCodes = [];
  let documents = [];
  for (const book in _usfm) {
    bookCodes.push(book);
    documents.push({
      selectors: {
        org: owner,
        lang: languageId,
        abbr: name.split('_')[1],
      },
      bookCode: book.toUpperCase(),
      data: _usfm[book],
    });
  }

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
    bookCodes,

    verbose,
  });

  console.log(passages);

  return { passages };
}
