import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Switch
} from 'react-native';

import {ThemeContext} from '../context/Context';
import Themes from '../constants/Themes';
import Colors from '../constants/Colors';
import {font} from '../styles/Styles';

export default function SettingsScreen() {
  const context = useContext(ThemeContext);
  let nightMode = false;
  let label = 'Activate night mode:';

  if (context.theme === Themes.dark) {
    nightMode = true;
    label = 'Deactivate night mode:';
  }

  return (
    <View style={[styles.container, {
      backgroundColor: context.theme.backgroundColor,
    }]}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}>
            <Image source={require('../assets/images/line-night-mode.png')} style={styles.image} />
            <View style={styles.switchContainer}>
              <Text style={[font.title, {color: context.theme.textColor, fontSize: 12, width: 150}]}>{label}</Text>
              <Switch 
                onValueChange={context.toggleTheme} 
                value={nightMode}
                trackColor={{true: Colors.secondary}}
                thumbColor={Colors.primary}
                style={styles.switch}
              />
            </View>
        </ScrollView>
    </View>
  );
}

SettingsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    width: 50,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  }
});