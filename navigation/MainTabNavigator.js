import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ThemedBottomTabBar from '../components/ThemedBottomTabBar';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import EntryScreen from '../screens/EntryScreen';
import TrendingScreen from '../screens/TrendingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Colors from '../constants/Colors';
import {font} from '../styles/Styles';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Entry: {
      screen: EntryScreen,
    },
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-home'}
    />
  ),
};

HomeStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
    },
    Entry: {
      screen: EntryScreen,
    },
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-search'}
    />
  ),
};

SearchStack.path = '';

const TrendingStack = createStackNavigator(
  {
    Trending: TrendingScreen,
  },
  config
);

TrendingStack.navigationOptions = {
  tabBarLabel: 'Trending',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-flash'} />
  ),
};

TrendingStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-settings'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Search: SearchStack,
  Trending: TrendingStack,
  Settings: SettingsStack,
}, {
  initialRouteName: 'Home',
  order: [
    'Home',
    'Search',
    'Trending',
    'Settings',
  ],
  tabBarOptions: {
    activeTintColor: Colors.primary,
    labelStyle: font.menu,
  },
  tabBarComponent: ThemedBottomTabBar,
});

tabNavigator.path = '';

export default tabNavigator;
