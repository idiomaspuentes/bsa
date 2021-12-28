import React, { useState, useEffect, useContext } from 'react';

import { DialogUI } from '..';
import Search from './Search';
import { ReferenceContext, AppContext } from '../../context';
import { core } from 'scripture-resources-rcl';
import { bibleList } from '../../config/base';
import SearchIcon from '@material-ui/icons/Search';
import {
  FormControl,
  NativeSelect,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { useStyles } from './style';

function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState(null);
  const [resourcesBible, setResourcesBible] = useState([]);
  const [resourceSearch, setResourceSearch] = useState([]);
  const [optionsBible, setOptionsBible] = useState([]);
  const [clickOnWord, setClickOnWord] = useState(false);
  const [usfm, setUsfm] = useState([]);
  const [references, setReferences] = useState([]);
  const { resourceFromResourceLink, getResponseData } = core;
  const [documents, setDocuments] = useState([]);

  const {
    state: { referenceSelected },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);
  const [searchBookCodes, setSearchBookCodes] = useState([]);
  console.log(bibleList);
  const {
    state: { appConfig, resourcesApp },
  } = useContext(AppContext);
  const classes = useStyles();
  const getBookTList = (t) => {
    return bibleList
      .filter((book) => book.categories === `bible-${t}`)
      .map((book) => book.identifier);
  };

  const bookOptions = [
    { key: 'current', label: 'Current book', books: [referenceSelected.bookId] },
    { key: 'nt', label: 'New Testament', books: getBookTList('nt') },
    { key: 'ot', label: 'Old Testament', books: getBookTList('ot') },
  ];

  const onCloseDialogUI = () => {
    setOpen(false);
    setValue('');
  };
  const handleOpenDialogUI = () => {
    setOpen(true);
    setResourceSearch(resourcesBible[0]);
  };
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      setSearch(value);
    }
  };
  const handleClickWord = (word) => {
    setValue('');
    setTimeout(() => {
      setValue(word);
      setSearch(word);
    }, 1000);
  };
  const handleClickSearch = () => {
    setSearch(value);
  };

  const handleChangeBooks = (e) => {
    console.log('e.target.value', JSON.parse(e.target.value));
    setSearchBookCodes(JSON.parse(e.target.value));
  };
  const handleChangeResources = (e) => {
    setResourceSearch(JSON.parse(e.target.value));
    setValue('');
  };

  const handleWordBox = () => {
    setClickOnWord((prev) => !prev);
  };

  useEffect(() => {
    if (value === '') {
      setSearch(null);
    }
  }, [value]);
  useEffect(() => {
    const currentResources =
      resourcesApp &&
      appConfig &&
      resourcesApp.filter((e) => appConfig.lg.map((e) => e.i).includes(e.name));
    const _resources = currentResources.filter((e) => {
      return (
        /bible/.test(e.subject.toLowerCase()) || /testament/.test(e.subject.toLowerCase())
      );
    });
    setResourcesBible(_resources);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appConfig]);

  useEffect(() => {
    const options = resourcesBible.map((el) => {
      const { languageId, name, owner } = el;
      return (
        <option
          key={el.id}
          value={JSON.stringify({ languageId, name, owner })}
          className={classes.option}
        >
          {el.title}
        </option>
      );
    });
    setOptionsBible(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourcesBible]);
  const listRef = 'master';

  const { languageId, name, owner } = resourceSearch && resourceSearch;

  const resourceId = name && name.split('_')[1];
  const server = 'https://git.door43.org';
  useEffect(() => {
    let _references = [];
    searchBookCodes.forEach((e) => _references.push({ projectId: e }));
    setReferences(_references);
  }, [searchBookCodes]);

  const resourceLink =
    resourcesBible.length > 0 && `${owner}/${languageId}/${resourceId}/${listRef}`;
  const config = {
    server,
  };
  const resourcesFromResourceLinks = async ({ resourceLink, references, config }) => {
    const promises =
      references &&
      references.map((reference) =>
        resourceFromResourceLink({
          resourceLink,
          reference,
          config,
        })
      );
    // Filter invalid resources (those that did not parse)
    const resources = await (
      await Promise.all(promises)
    ).filter((parsedResource) => parsedResource != null);
    return resources;
  };
  const [resource, setResource] = useState([]);

  console.log(Object.keys(usfm));
  useEffect(() => {
    let _usfm = {};
    if (resource.length > 0) {
      console.log('resource', resource);
      resource.forEach((res) => {
        if (res.project) {
          const key = res.project.identifier;
          console.log(key);
          res.project
            .file()
            .then((response) => {
              if (getResponseData(response) !== undefined) {
                _usfm[key] = getResponseData(response);
              }
            })
            .catch((error) => console.log(error));
        }
      });
    }
    if (_usfm) {
      setUsfm(_usfm);
    }
  }, [resource, resourceSearch]);
  useEffect(() => {
    if (open) {
      resourcesFromResourceLinks({
        resourceLink,
        references,
        config,
      })
        .then((_resource) => {
          setResource(_resource);
        })
        .catch((error) => {
          console.warn(`useRsrc() - error fetching resource for:`, error);
        });
    }
  }, [open]);

  useEffect(() => {
    let _documents = [];

    if (searchBookCodes && usfm && resourceSearch) {
      const { languageId, name, owner } = resourceSearch;
      searchBookCodes.forEach((code) => {
        _documents.push({
          selectors: {
            org: owner,
            lang: languageId,
            abbr: name && name.split('_')[1],
          },
          bookCode: code,
          data: usfm[code],
        });
      });
    }
    console.log(_documents);
    setDocuments(_documents);
  }, [searchBookCodes, usfm, resourceSearch]);

  return (
    <div>
      <Button
        color={'primary'}
        variant={'contained'}
        disableElevation={true}
        onClick={handleOpenDialogUI}
      >
        <SearchIcon className={classes.searchIcon} />
        Search
      </Button>

      <DialogUI open={open} onClose={onCloseDialogUI} title={' '}>
        <div className={classes.root}>
          <FormControl className={classes.formControl}>
            <NativeSelect
              labelid="workSpace-select-label"
              disableUnderline={true}
              onChange={handleChangeResources}
            >
              {optionsBible}
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.formControl}>
            <NativeSelect
              labelid="workSpace-select-label"
              disableUnderline={true}
              onChange={handleChangeBooks}
            >
              {bookOptions.map((el) => (
                <option
                  key={el.key}
                  value={JSON.stringify(el.books)}
                  className={classes.option}
                >
                  {el.label}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <TextField
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => {
              setSearch(null);
              setValue(e.target.value);
            }}
            onKeyPress={(e) => handleKeyPress(e)}
            value={value}
          />
          <Button color={'primary'} disableElevation={true} onClick={handleOpenDialogUI}>
            <SearchIcon onClick={handleClickSearch} className={classes.searchIcon} />
          </Button>
          <FormControlLabel
            control={
              <Checkbox checked={clickOnWord} onChange={handleWordBox} color="primary" />
            }
            label="Search by word"
          />

          <Divider className={classes.divider} />
          {search && usfm && documents ? (
            <Search
              referenceSelected={referenceSelected}
              setValue={setValue}
              setSearch={setSearch}
              searchText={search}
              open={open}
              handleCloseDialogUI={onCloseDialogUI}
              resourceSearch={resourceSearch}
              goToBookChapterVerse={goToBookChapterVerse}
              handleClickWord={handleClickWord}
              clickOnWord={clickOnWord}
              usfm={usfm}
              searchBookCodes={searchBookCodes}
              documents={documents}
            />
          ) : null}
        </div>
      </DialogUI>
    </div>
  );
}

export default SearchDialog;
