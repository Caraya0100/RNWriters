import React, {useContext} from 'react';
import { BottomTabBar } from 'react-navigation';

import {ThemeContext} from '../context/Context';
import CircleIcon from '../components/CircleIcon';

export default function TopBarHeaderLeft(props) {
    const {navigation} = props;
    const context = useContext(ThemeContext);

    return(
        <CircleIcon 
            icon={'md-arrow-back'} 
            size={32} 
            border={0} 
            border={{width: 0, color: 'transparent'}} 
            fontSize={24}
            bgColors={[context.theme.transparentBgColor]} 
            textColor={context.theme.backTextColor} 
            onPress={() => navigation.goBack()}
            style={{marginLeft: 10}}
        />
    );
  }