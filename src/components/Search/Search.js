import React from 'react';
import { useProskomma, useSearch } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import DialogUI from '../DialogUI/DialogUI';
import { Button } from '@material-ui/core';
import { useContent } from 'translation-helps-rcl';

const searchText = 'надежде';

function Search() {
  const content = useContent({
    chapter: 1,
    projectId: 'tit',
    branch: 'master',
    languageId: 'ru',
    resourceId: 'rlob',
    owner: 'bsa',
    server: 'https://git.door43.org',
  });
  console.log(content);
  const _documents = [
    {
      selectors: {
        org: 'bsa',
        lang: 'ru',
        abbr: 'rlob',
      },
      bookId: 'tit',
      data: content.markdown,
    },
  ];
  const [open, setOpen] = React.useState(false);
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
    stateId: searchStateId,
    query,
    data,
    passages,
    errors: searchErrors,
  } = useSearch({
    proskomma,
    stateId,
    text: searchText,
  });

  const json = {
    stateId,
    searchStateId,
    documents,
    proskommaErrors,
    searchText,
    searchErrors,
    query,
    passages,
    data,
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
