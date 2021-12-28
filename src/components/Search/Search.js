import React, { useState, useEffect } from 'react';

import useSearch from './useSearch';
import { Progress, TableMatches } from '..';

import { Pagination } from '@material-ui/lab';
import { useStyles } from './style';

const limitVersesOnPage = 5;

function Search({
  handleCloseDialogUI,
  searchText,
  referenceSelected,
  resourceSearch,
  goToBookChapterVerse,
  setSearch,
  setValue,
  handleClickWord,
  clickOnWord,
  usfm,
  searchBookCodes,
  documents,
}) {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [versesCount, setVersesCount] = useState(0);
  const { bookId } = referenceSelected;

  const classes = useStyles();
  const lastIndex = page * limitVersesOnPage;
  const firstIndex = lastIndex - limitVersesOnPage;
  const { verseObjects, matches, passages } = useSearch({
    resourceSearch,
    referenceSelected,
    searchText,
    _usfm: usfm,
    searchBookCodes,
    documents,
  });

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const handleClickVerse = (chapter, verse) => {
    setValue('');
    goToBookChapterVerse(bookId, chapter, verse);
    setSearch(null);
    handleCloseDialogUI();
  };

  useEffect(() => {
    setPages(Math.ceil(versesCount / limitVersesOnPage));
  }, [versesCount]);

  useEffect(() => {
    setVersesCount(passages.length);
  }, [passages]);

  const tableMatches = (
    <>
      <div className={classes.tableMatches}>
        <TableMatches
          passages={passages}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          handleClickVerse={handleClickVerse}
        />
      </div>

      {passages.length > 5 ? (
        <div className={classes.pagination}>
          <Pagination
            count={pages}
            color="primary"
            page={page}
            onChange={handlePagination}
            variant="outlined"
            shape="rounded"
          />
        </div>
      ) : null}
    </>
  );

  return (
    <div>
      {matches || passages ? (
        <>
          <div className={classes.wrapperMatchesBlock}>
            <div className={classes.matchesResultString}>
              {`There are ${
                matches?.length > 0 ? Object.keys(verseObjects).length : 'no'
              } matches  for the "${searchText}":`}
            </div>
            <br />
            {tableMatches}
          </div>
        </>
      ) : (
        <Progress />
      )}
    </div>
  );
}

export default Search;
