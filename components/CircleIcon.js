import React, {useContext} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import {ThemeContext} from '../context/Context';
import Colors from '../constants/Colors';

export default function BoldCircle(props) {
    const context = useContext(ThemeContext);
    const {size, fontSize, border} = props;
    const styles = styleSheet(size, border, context.theme.background);

    return(
        <View style={[styles.container, props.style]}>
            <LinearGradient
            colors={[Colors.secondary, Colors.primary]}
            style={styles.background}>
                <Ionicons name="ios-add" size={fontSize} color="white" />
            </LinearGradient>
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
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        borderRadius: size / 2,
    },
}));