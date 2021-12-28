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

  usfm,
}) {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [versesCount, setVersesCount] = useState(0);
  const [tableVerse, setTableVerse] = useState([]);

  const { chapter, bookId, verse } = referenceSelected;

  const classes = useStyles();
  const lastIndex = page * limitVersesOnPage;
  const firstIndex = lastIndex - limitVersesOnPage;
  const { passages } = useSearch({
    resourceSearch,
    referenceSelected,
    searchText,
    _usfm: usfm,
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

      {passages.length > 3 ? (
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
  console.log({ passages });
  return (
    <div>
      {passages.length > 0 ? (
        <>
          <div className={classes.wrapperMatchesBlock}>
            <div className={classes.matchesResultString}>
              {`There are ${
                passages.length > 0 ? passages.length : 'no'
              } matches  for the "${searchText}":`}
            </div>
            <br />
            {passages.length > 0 ? tableMatches : null}
          </div>
        </>
      ) : (
        <Progress />
      )}
    </div>
  );
}

export default React.memo(Search);
