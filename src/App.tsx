import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';

import NavBar from './NavBar';

const Details = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <NavBar />

        <Suspense fallback={<h1>Loading route...</h1>}>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </Suspense>
      </div>
    </Provider>
  );
};

render(<App />, document.getElementById('root'));
