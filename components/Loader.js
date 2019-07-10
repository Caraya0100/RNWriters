import React from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,
} from 'react-native';

export default function Loader(props) {
    const {size, color} = props;

    return(
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});