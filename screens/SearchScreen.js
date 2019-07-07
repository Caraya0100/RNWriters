import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
} from 'react-native';

import {getAll} from '../api/Entries';

export default function SearchScreen(props) {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        async function fetchEntries() {
          const response = await getAll();
          console.log(response);
          setEntries(response);
        }
        
        fetchEntries();
    }, []);

    return (
        <View>
            <Text>
                Numbers of entries {entries.length}.
            </Text>
        </View>
    );
}