import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {ThemeContext} from '../context/Context';
import TopBarHeaderLeft from '../components/TopBarHeaderLeft';
import {useEntry} from '../hooks/Dom';

export default function EntryScreen(props) {
  const context = useContext(ThemeContext);
  const entry = useEntry(props.navigation.getParam('id', ''));

  return (
    <View style={[styles.container, {
      backgroundColor: context.theme.backgroundColor,
    }]}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {entry}
        </ScrollView>
    </View>
  );
}

EntryScreen.navigationOptions = ({navigation}) => {
  return({
    headerTransparent: true,
    headerLeft: (<TopBarHeaderLeft navigation={navigation} />),
  })
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});