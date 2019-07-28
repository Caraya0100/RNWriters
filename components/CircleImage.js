import React, {useContext, useEffect, useRef} from 'react';
import {
    Image,
    View,
    TouchableOpacity,
    Animated,
    StyleSheet,
} from 'react-native';

import {ThemeContext} from '../context/Context';

export default function CircleImage(props) {
    const context = useContext(ThemeContext);
    const {size, url, border, transition, onPress} = props;
    const styles = styleSheet(size, border, context.theme.backgroundColor);
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

    return(
        <Animated.View style={[styles.container, props.style, animation]}>
            <TouchableOpacity onPress={onPress}>
                <Image source={{uri: url}} style={styles.image} />
            </TouchableOpacity>
        </Animated.View>
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