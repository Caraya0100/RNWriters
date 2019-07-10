import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {ThemeContext} from '../context/Context';

export default function TrendingScreen() {
  const context = useContext(ThemeContext);

  return (
    <View style={[styles.container, {
      backgroundColor: context.theme.backgroundColor,
    }]}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}>
        </ScrollView>
    </View>
  );
}

TrendingScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 30,
  },
});