import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {ThemeContext} from '../context/Context';
import {useEntriesList} from '../hooks/Dom';
import Entry from '../components/Entry';

export default function SearchScreen(props) {
  const context = useContext(ThemeContext);

  onPressEntry = (id) => {
    props.navigation.navigate('Entry', { id });
  }

  keyExtractor = (item, index) => item.id;

  const entries = useEntriesList({
    keyExtractor,
    horizontal: false, 
    renderItem: ({item}) => (
      <Entry
        id={item.id}
        content={{title: item.title, text: item.excerpt, date: item.date}}
        author={{id: item.uid, image: item.uimg, name: item.uname}}
        image={{url: item.image, size: 70, shape: 'rect'}}
        border={3}
        navigate={props.navigation.navigate}
        icon={{i: 'ios-add', size: 60, fontSize: 28, onPress: () => onPressEntry(item.id)}}
      />
    )
  });

  return (
    <View style={[styles.container, {
      backgroundColor: context.theme.backgroundColor,
    }]}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {entries}
        </ScrollView>
    </View>
  );
}

SearchScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  }
});