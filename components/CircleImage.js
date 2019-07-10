import React, {useContext} from 'react';
import {
    Image,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {ThemeContext} from '../context/Context';

export default function CircleImage(props) {
    const context = useContext(ThemeContext);
    const {size, url, border, onPress} = props;
    const styles = styleSheet(size, border, context.theme.backgroundColor);

    return(
        <View style={[styles.container, props.style]}>
            <TouchableOpacity onPress={onPress}>
                <Image source={{uri: url}} style={styles.image} />
            </TouchableOpacity>
        </View>
    );
}

const styleSheet = (size, borderWidth, borderColor) => (StyleSheet.create({
    container: {
        position: 'relative',
        width: size + borderWidth * 2, 
        height: size + borderWidth * 2, 
        paddingTop: borderWidth,
        paddingLeft: borderWidth,
        borderRadius: (size + borderWidth * 2) / 2,
        backgroundColor: borderColor,
    },
    border: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: size + borderWidth * 2, 
        height: size + borderWidth * 2, 
        
    },
    image: {
        width: size,
        height: size,
        borderRadius: size / 2,
    }
}));