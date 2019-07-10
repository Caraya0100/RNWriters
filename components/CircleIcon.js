import React, {useContext} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function BoldCircle(props) {
    const {icon, size, fontSize, border, bgColors, textColor, onPress, style} = props;
    const styles = styleSheet(size, border);

    background = () => {
        if (bgColors.length > 1) {
            return(
                <LinearGradient
                colors={bgColors}
                start={[0, 1]} end={[1, 0]}
                style={styles.background}>
                    <Ionicons name={icon} size={fontSize} color={textColor} />
                </LinearGradient>
            );
        } else {
            return(
                <View style={[styles.background, {backgroundColor: bgColors[0]}]}>
                    <Ionicons name={icon} size={fontSize} color={textColor} />
                </View>
            );
        }
    }

    return(
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={onPress}>
                {background()}
            </TouchableOpacity>
        </View>
    );
}

const styleSheet = (size, border) => (StyleSheet.create({
    container: {
        position: 'relative',
        width: size + border.width * 2, 
        height: size + border.width * 2, 
        paddingTop: border.width,
        paddingLeft: border.width,
        borderRadius: (size + border.width * 2) / 2,
        backgroundColor: border.color,
    },
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        borderRadius: size / 2,
    },
}));