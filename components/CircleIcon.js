import React, {useEffect, useRef} from 'react';
import {
    View,
    TouchableOpacity,
    Animated,
    StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function CircleIcon(props) {
    const {icon, size, fontSize, border, bgColors, textColor, transition, onPress, style} = props;
    const styles = styleSheet(size, border);
    const offset = transition.direction === 'horizontal' ? size * 0.5 : -size * 0.5;
    const translate = useRef(new Animated.Value(offset));

    useEffect(() => {
        Animated.spring(
            translate.current, {
                toValue: 0,
                speed: transition.duration,
                bounciness: 20
            },
        ).start();
    }, []);

    let animation = {transform: [{translateX: translate.current}]};
    
    if (transition.direction === 'vertical') animation = {transform: [{translateY: translate.current}]};

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
        <Animated.View style={[styles.container, style, animation]}>
            <TouchableOpacity onPress={onPress}>
                {background()}
            </TouchableOpacity>
        </Animated.View>
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