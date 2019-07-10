import React, { useState } from 'react';

import Themes from './constants/Themes';
import {ThemeContext} from './context/Context';
import LoadingScreen from './screens/LoadingScreen';

export default function App(props) {
  const [theme, setTheme] = useState(Themes.light);

  toggleTheme = () => {
    if (theme === Themes.light) {
      setTheme(Themes.dark);
    } else {
      setTheme(Themes.light);
    }
  };

  return (
    <ThemeContext.Provider value={{theme: theme, toggleTheme: toggleTheme}}>
      <LoadingScreen/>
    </ThemeContext.Provider>
  );
}