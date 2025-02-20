import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import './i18next';
import { Migrate } from './Migrate';
import ContextProviders from './context/ContextProviders';
import './styles/style.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';
// const App = React.lazy(() => import('./App.js'));

Migrate();
ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Switch>
        <ContextProviders>
          <Route>
            <SnackbarProvider maxSnack={3}>
              <App />
            </SnackbarProvider>
          </Route>
        </ContextProviders>
      </Switch>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
