import React from 'react';

import Themes from '../constants/Themes';

export const ThemeContext = React.createContext({
    theme: Themes.light, // default value
    toggleTheme: () => {},
});
  