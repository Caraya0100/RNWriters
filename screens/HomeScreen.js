import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';

import {ThemeContext} from '../context/Context';
import {useEntriesList} from '../hooks/Dom';
import Entry from '../components/Entry';

export default function HomeScreen(props) {
  const context = useContext(ThemeContext);

  onPressEntry = (id) => {
    props.navigation.navigate('Entry', { id });
  }

  keyExtractor = (item, index) => item.id;

  const entries = useEntriesList({
    horizontal: true, 
    renderItem: ({item}) => (
      <Entry
        id={item.id}
        content={{title: item.title, text: item.excerpt, date: item.date}}
        author={{id: item.uid, image: item.uimg}}
        image={{url: item.image, size: 120, shape: 'circle'}}
        border={5}
        icon={{i: 'ios-add', size: 100, fontSize: 48, onPress: () => onPressEntry(item.id)}}
        navigate={props.navigation.navigate}
        style={styles.entry}
      />
    )
  });

  return (
    <View style={[styles.container, {backgroundColor: context.theme.backgroundColor}]}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {entries}
        </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
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
  entry: {
    width: Dimensions.get('screen').width,
  }
});