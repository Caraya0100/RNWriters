import React, {useState, useEffect, useContext} from 'react';
import {
    FlatList,
    StyleSheet
  } from 'react-native';

import Colors from '../constants/Colors';
import {useFetch} from './Fetch';
import {ThemeContext} from '../context/Context';
import Loader from '../components/Loader';
import Entry from '../components/Entry';
import Slider from '../components/Slider';
import User from '../components/User';

export function useLoadContent({effect, endpoint, defaultValue, dependencies = []}) {
    const response = useFetch(endpoint, defaultValue);
    const [content, setContent] = useState((<Loader size="large" color={Colors.primary} />));

    dependencies.push(response);
    useEffect(() => {
        effect(response, setContent);
    }, dependencies);

    return content;
}

export function useEntriesSlider({horizontal, renderItem}) {
    const context = useContext(ThemeContext);
    const content = useLoadContent({
        effect: (response, setContent) => {
            if (response.length) {
                setContent((
                    <Slider
                    data={response}
                    renderItem={renderItem}
                    horizontal={horizontal}
                    loader={{size: 'large', color: Colors.primary}}
                    itemStyle={{
                        backgroundColor: context.theme.backgroundColor,
                        /*borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderColor: context.theme.borderColor,*/
                      }}
                    />
                ));
            }
        },
        endpoint: 'entries',
        defaultValue: [],
        dependencies: [context],
    });

    return content;
}

export function useEntriesList({keyExtractor, horizontal, renderItem, uid = null}) {
    let endpoint = uid === null ? 'entries': 'entries/user/' + uid;
    
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
        endpoint,
        defaultValue: [],
    });

    return content;
}

export function useEntry(id, navigate) {
    const content = useLoadContent({
        effect: (response, setContent) => {
            if (Object.keys(response).length !== 0 && response.constructor === Object) {
                setContent((
                    <Entry
                        id={response.id}
                        content={{title: response.title, text: response.text, date: response.date}}
                        author={{id: response.uid, image: response.uimg, name: response.uname}}
                        image={{url: response.image, size: 70, shape: 'rect'}}
                        border={3}
                        icon={{i: 'ios-heart-empty', size: 60, fontSize: 28}}
                        animation={'vertical'}
                        navigate={navigate}
                    />
                ));
            }
        },
        endpoint: 'entry/' + id,
        defaultValue: [],
    });

    return content;
}

export function useUser(id) {
    const content = useLoadContent({
        effect: (response, setContent) => {
            if (Object.keys(response).length !== 0 && response.constructor === Object) {
                setContent((
                    <User
                    id={response.id}
                    name={response.name}
                    desc={response.desc}
                    image={{url: response.image, size: 120}}
                    entries={response.entries}
                    views={response.views}
                    likes={response.likes}
                    border={3}
                    icon={{i: 'ios-checkmark', size: 100, type: 'line', fontSize: 48}}
                    style={{paddingTop: 60}} />
                ));
            }
        },
        endpoint: 'user/' + id,
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