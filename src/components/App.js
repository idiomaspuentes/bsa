import React from 'react';
import { ResourcesContextProvider } from 'scripture-resources-rcl';
import BookList from './BookList';
import { Container } from './styled';
import MenuBar from './MenuBar';
import '../style.css';

function App() {
  const config = { server: 'https://git.door43.org' };

  const _resourceLinks = [
    'ru_gl/ru/rlob/master',
    //"unfoldingWord/en/ult/v5/3jn"
  ];

  const [resourceLinks, setResourceLinks] = React.useState(_resourceLinks);
  const [resources, setResources] = React.useState([]);
  const [bookId, setBookId] = React.useState();
  const reference = { bookId };

  return (
    <Container>
      <MenuBar />
      <span style={{ color: 'black' }}>{bookId}</span>
      <ResourcesContextProvider
        reference={reference}
        resourceLinks={resourceLinks}
        defaultResourceLinks={_resourceLinks}
        onResourceLinks={setResourceLinks}
        resources={resources}
        onResources={setResources}
        config={config}
      >
        <BookList onBookId={setBookId} />
      </ResourcesContextProvider>
    </Container>
  );
}

export default App;
