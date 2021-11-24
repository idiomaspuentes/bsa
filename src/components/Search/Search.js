import React, { useContext } from 'react';

import { useProskomma, useQuery } from 'proskomma-react-hooks';

import ReactJson from 'react-json-view';
import DialogUI from '../DialogUI/DialogUI';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  Popover,
  makeStyles,
} from '@material-ui/core';
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
  const [selectValue, setSelectValue] = React.useState('');
  const [value, setValue] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const handleChangeSelect = (event) => {
    setValue(event.target.value);
    setSelectValue(event.target.value);
  };
  const onRun = () => {
    setSearchQuery(value);
  };
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

  //   const query = `{
  //   processor
  //   packageVersion
  //   documents(withBook: "${bookId.toUpperCase()}") {
  //     cv (chapter:"" )
  //       { text }
  //   }
  // }`;

  const hookRes = useProskomma({
    documents: _documents,
    serialize: false,
    verbose: true,
  });
  const { stateId, proskomma, errors: proskommaErrors } = hookRes;
  const {
    stateId: queryStateId,
    query: queryRun,
    data,
    errors: queryErrors,
  } = useQuery({
    proskomma,
    stateId,
    query: searchQuery,
  });
  let verses = [];
  if (
    data &&
    data.docSets &&
    data.docSets.length > 0 &&
    data.docSets[0].document &&
    data.docSets[0].document.cv &&
    data.docSets[0].document.cv.length > 0 &&
    data.docSets[0].document.cv[0].tokens
  ) {
    const dataState = data.docSets[0].document.cv[0].tokens.filter(
      (el) => el.scopes[1] === `verse/${verse}`
    );
    console.log(dataState);

    dataState.forEach((element) => {
      // verse.push({ text: element.payload });
      element.subType === 'wordLike'
        ? verses.push({
            id: element.id,
            text: element.payload,
            strong: element.scopes[4].replace('attribute/milestone/zaln/x-strong/0/', ''),
            greek: element.scopes[5].replace('attribute/milestone/zaln/x-lemma/0/', ''),
          })
        : verses.push({ text: element.payload });
    });
    //
  }
  console.log(verse);
  const json = {
    queryStateId,
    query: queryRun,
    data,
    errors: [...proskommaErrors, ...queryErrors],
  };
  const onClose = () => {
    setOpen(false);
  };
  const queryes = [
    {
      id: '1',
      name: 'Все слова в книге',
      text: `{ docSets { document(bookCode: "TIT") { mainSequence { id type wordLikes tags } } } } `,
    },
    {
      id: '2',
      name: 'Вся книга',
      text: `{
    docSets {
             id
             selectors { key value }
             tags
             documents {
               id
               header (id:"toc")
               tags
               sequences {
                 id
                 type
                 tags
                 blocks{
                   is { type subType payload  }
                   bs { payload }
                   bg { subType payload }
                   tokens { type subType payload }
                   items  { type subType payload  }
                 }
               }
             }
           }
   }`,
    },
    {
      id: '3',
      name: 'По главам',
      text: `{
        docSets {
          document(bookCode:"${bookId.toUpperCase()}") {
cv (chapter:"${chapter}" ) { tokens {subType payload scopes} }
          
      }}}`,
    },

    {
      id: '4',
      name: 'Похоже на поиск',
      text: `{ docSets
  {
    document(bookCode:"${bookId.toUpperCase()}")
    { title: header(id:"toc")
      mainSequence { id type tags hasChars(chars: "${searchQuery}")}
    }
  }
} `,
    },
  ];
  const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [strong, setStrong] = React.useState(null);
  console.log(strong);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openPP = Boolean(anchorEl);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Proskomma
      </Button>
      <DialogUI open={open} onClose={onClose} titleDialogClose>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexBasis: 0,
              flexGrow: 1,
            }}
          >
            <TextField
              style={{ height: '400px', overflow: 'auto' }}
              multiline
              variant="outlined"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div>
                <span style={{ fontWeight: 'bold' }}>{`${verse} `}</span>
                {verses.map((el) => (
                  <>
                    <span
                      onClick={(event) => {
                        handleClick(event);

                        setStrong(`${el.greek} ${el.strong}`);
                      }}
                      key={el.id}
                    >
                      {el.text}
                    </span>
                  </>
                ))}
              </div>
              <p></p>
              <p></p>
              <p></p>
              <>
                <Popover
                  open={openPP}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Typography className={classes.typography}>{strong}</Typography>
                </Popover>
              </>
              <Select value={selectValue} onChange={handleChangeSelect}>
                {queryes.map((el) => (
                  <MenuItem key={el.id} value={el.text}>
                    {el.name}
                  </MenuItem>
                ))}
              </Select>
              <Button color="primary" variant="contained" onClick={onRun}>
                Запустить
              </Button>
            </div>
          </div>
          <ReactJson
            style={{ maxHeight: '500px', overflow: 'scroll', flexBasis: 0, flexGrow: 1 }}
            src={json}
            theme="monokai"
          />
        </div>
      </DialogUI>
    </>
  );
}

export default Search;
