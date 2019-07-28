import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {ThemeContext} from '../context/Context';
import {useUser, useEntriesList} from '../hooks/Dom';
import TopBarHeaderLeft from '../components/TopBarHeaderLeft';
import Entry from '../components/Entry';

export default function UserScreen(props) {
  const context = useContext(ThemeContext);
  const user = useUser(props.navigation.getParam('id', ''));

  onPressEntry = (id) => {
    props.navigation.navigate('Entry', { id });
  }

  keyExtractor = (item, index) => item.id;

  const entries = useEntriesList({
    uid: props.navigation.getParam('id', ''),
    keyExtractor,
    horizontal: false, 
    renderItem: ({item}) => (
      <Entry
        id={item.id}
        content={{title: item.title, text: item.excerpt, date: item.date}}
        author={{id: item.uid, name: item.uname}}
        image={{url: item.image, size: 40, shape: 'rect'}}
        border={3}
        navigate={props.navigation.navigate}
        icon={{i: 'ios-add', size: 40, fontSize: 18, onPress: () => onPressEntry(item.id)}}
        animation={'vertical'}
        />
    )
  });

  return (
    <View style={[styles.container, {
      backgroundColor: context.theme.backgroundColor,
    }]}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.userContainer}>{user}</View>
          <View style={styles.entriesContainer}>{entries}</View>
        </ScrollView>
    </View>
  );
}

UserScreen.navigationOptions = ({navigation}) => {
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
  userContainer: {
    minHeight: 300,
  },
  entriesContainer: {
    minHeight: 300,
  }
});