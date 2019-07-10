import React, {useState, useEffect} from 'react';
import {
    FlatList,
    StyleSheet
  } from 'react-native';

import Colors from '../constants/Colors';
import {useFetch} from './Fetch';
import Loader from '../components/Loader';
import Entry from '../components/Entry';

export function useLoadContent({effect, endpoint, defaultValue}) {
    const response = useFetch(endpoint, defaultValue);
    const [content, setContent] = useState((<Loader size="large" color={Colors.primary} />));

    useEffect(() => {
        effect(response, setContent);
    }, [response]);

    return content;
}

export function useEntriesList({horizontal, renderItem}) {
    const content = useLoadContent({
        effect: (response, setContent) => {
            if (response.length) {
                setContent((
                    <FlatList
                    data={response}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    horizontal={horizontal}
                    contentContainerStyle={styles.listContainer}
                    />
                ));
            }
        },
        endpoint: 'entries',
        defaultValue: [],
    });

    return content;
}

export function useEntry(id) {
    const content = useLoadContent({
        effect: (response, setContent) => {
            if (Object.keys(response).length !== 0 && response.constructor === Object) {
                setContent((
                    <Entry
                        id={response.id}
                        content={{title: response.title, text: response.text, date: response.date}}
                        author={{id: response.uid, image: response.uimg}}
                        image={{url: response.image, size: 70, shape: 'rect'}}
                        border={3}
                        icon={{i: 'ios-heart-empty', size: 60, fontSize: 28}}
                    />
                ));
            }
        },
        endpoint: 'entry/' + id,
        defaultValue: [],
    });

    return content;
}

const styles = StyleSheet.create({
    listContainer: {
      flexGrow: 1,
      alignItems: 'stretch',
    },
});