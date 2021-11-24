import React, { useContext } from 'react';

import { useProskomma, useQuery } from 'proskomma-react-hooks';

import ReactJson from 'react-json-view';
import DialogUI from '../DialogUI/DialogUI';
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import { useContent } from 'translation-helps-rcl';

import { ReferenceContext } from '../../context';

function Search() {
  const {
    state: { referenceSelected },
  } = useContext(ReferenceContext);

  const { bookId, chapter } = referenceSelected;

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
                  document(bookCode: "TIT") {
                     cvIndex(chapter:1) {
                        chapter
                        verseNumbers {
                          number
                          range
                          }
                        verseRanges {
                           range
                          numbers
                        }
                        verses {
                          verse {
                            items {
                              subType
                              payload
              }text
            }
          }
        }
      }
    }
   }`,
    },
    {
      id: '4',
      name: 'Непонятно',
      text: `{
     processor
     packageVersion
     documents {  mainSequence { id type  blocks { items { subType payload } tokens{payload} os { payload } is { payload } text }  }
      }
   } `,
    },
    {
      id: '5',
      name: 'Непонятно2',
      text: `{ docSets { id nDocuments documents { id } } } `,
    },
    {
      id: '6',
      name: 'yj',
      text: `{
     processor
     packageVersion
     documents {  mainSequence { id type  blocks { items { subType payload } tokens{payload} os { payload } is { payload } text }  }
      }
   } `,
    },
    {
      id: '7',
      name: 'Похоже на поиск',
      text: `{ docSets
  {
    document(bookCode:"TIT")
    { title: header(id:"toc")
      mainSequence { id type tags hasChars(chars: "${searchQuery}")}
    }
  }
} `,
    },
  ];
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
