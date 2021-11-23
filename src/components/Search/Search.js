import React, { useContext } from 'react';

import { useProskomma, useQuery } from 'proskomma-react-hooks';

import ReactJson from 'react-json-view';
import DialogUI from '../DialogUI/DialogUI';
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
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
  const [value, setValue] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };
  const handleChangeInput = (event) => {
    setSearchQuery(event.target.value);
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
  console.log(value);

  const {
    stateId: queryStateId,
    query: queryRun,
    data,
    errors: queryErrors,
  } = useQuery({
    proskomma,
    stateId,
    query: value,
  });
  console.log(data);
  const json = {
    queryStateId,
    // documents,
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
        <TextField
          id="outlined-multiline-static"
          style={{ width: '500px' }}
          multiline
          rows={10}
          variant="outlined"
          value={value}
        />

        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            onChange={handleChange}
            value={value}
          >
            {queryes.map((el) => (
              <FormControlLabel
                key={el.id}
                value={el.text}
                control={<Radio />}
                label={el.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <TextField
          id="outlined-multiline-static"
          style={{ width: '200px' }}
          variant="outlined"
          onChange={handleChangeInput}
        />
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
