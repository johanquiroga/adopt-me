import React from 'react';

const ThemeContext = React.createContext<[string, (theme: string) => void]>([
  'green',
  () => {},
]);

export default ThemeContext;
