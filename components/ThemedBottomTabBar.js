import React, {useContext} from 'react';
import { BottomTabBar } from 'react-navigation';

import {ThemeContext} from '../context/Context';

export default function ThemedBottomTabBar(props) {
    const context = useContext(ThemeContext);
    
    return(
      <BottomTabBar
        {...props}
        inactiveTintColor={context.theme.textColor}
        style={{
          backgroundColor: context.theme.menuBgColor,
        }}
      />
    );
  }