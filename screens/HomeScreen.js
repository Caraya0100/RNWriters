import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';

import {useFetch,} from '../hooks/Fetch';
import {ThemeContext} from '../context/Context';
import Entry from '../components/Entry';

export default function HomeScreen() {
  const context = useContext(ThemeContext);
  const entries = useFetch();

  keyExtractor = (item, index) => item.id;

  renderItem = ({item}) => (
    <Entry
      title={item.title}
      excerpt={item.excerpt}
      uimg={item.uimg}
      image={item.image}
      imageShape='circle'
      icon='ios-heart-empty'
    />
  );

  return (
    <View style={[styles.container, {
      backgroundColor: context.theme.background,
    }]}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}>
          <FlatList
            data={entries}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
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
  listContainer: {
    flexGrow: 1,
    alignItems: 'stretch',
  }
});