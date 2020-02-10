import React, { useState } from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';

import SearchParams from './SearchParams';
import Details from './Details';
import NavBar from './NavBar';

import ThemeContext from './ThemeContext';

const App = () => {
  const themeHook = useState('darkblue');

  return (
    <ThemeContext.Provider value={themeHook}>
      <div>
        <NavBar />

        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

render(<App />, document.getElementById('root'));
