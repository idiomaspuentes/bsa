import React, { useState, useEffect, useContext } from 'react';

import { DialogUI } from '..';
import Search from './Search';
import { ReferenceContext, AppContext } from '../../context';
import { core } from 'scripture-resources-rcl';
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
  const { resourceFromResourceLink, getResponseData } = core;

  const {
    state: { referenceSelected },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const bookOptions = [
    { key: 'current', label: 'Current book', bookCodes: [referenceSelected.bookId] },
    { key: 'nt', label: 'New Testament', bookCodes: ['tit'] },
    { key: 'ot', label: 'Old Testament', bookCodes: ['gen'] },
    { key: 'select', label: 'Select book', bookCodes: ['gen', 'tit'] },
  ];
  const {
    state: { appConfig, resourcesApp },
  } = useContext(AppContext);
  const classes = useStyles();

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
    console.log(JSON.parse(e.target.value));
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
  const { verse, chapter, bookId } = referenceSelected;
  const { languageId, name, owner } = resourceSearch && resourceSearch;

  const resourceId = name && name.split('_')[1];
  const server = 'https://git.door43.org';
  const references = [{ projectId: 'tit' }, { projectId: '1ti' }, { projectId: '2ti' }];
  const resourceLink =
    resourcesBible.length > 0 && `${owner}/${languageId}/${resourceId}/${listRef}`;
  const config = {
    server,
  };
  const resourcesFromResourceLinks = async ({ resourceLink, references, config }) => {
    const promises = references.map((reference) =>
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
  useEffect(() => {
    let _usfm = {};
    if (resource.length > 0) {
      resource.forEach((res) => {
        if (res.project) {
          const key = res.project.identifier;

          res.project
            .file()
            .then((response) => {
              const __usfm = getResponseData(response);
              _usfm[key] = __usfm;
            })
            .catch((error) => console.log(error));
        }
      });
    }
    if (_usfm) {
      setUsfm(_usfm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
                  value={JSON.stringify(el.bookCodes)}
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
          {search && usfm ? (
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
            />
          ) : null}
        </div>
      </DialogUI>
    </div>
  );
}

export default SearchDialog;
