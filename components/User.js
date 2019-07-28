import React, {useContext} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import {font} from '../styles/Styles';
import Colors from '../constants/Colors';
import {ThemeContext} from '../context/Context';
import CircleImage from './CircleImage';
import CircleIcon from './CircleIcon';
import LineCircleIcon from './LineCircleIcon';

const defaultProps = {
    name: '',
    desc: '',
    icon: {
        i: 'ios-checkmark', 
        size: 60, 
        fontSize: 28, 
        onPress: ()=> {}
    },
    style: {},
}

export default function User(props) {
    const {
        style, 
        id,
        image, 
        name,
        icon,
        desc, 
        border, 
        entries, 
        views, 
        likes, 
        onClickFollow
    } = props;
    const context = useContext(ThemeContext);
    const marginLeft = image.size * 0.33;
    let marginTop = 0;
    let paddingBottom = 0;

    circleIcon = () => {
        if (icon.type !== 'line') {
            return(
                <CircleIcon 
                icon={icon.i} 
                size={icon.size} 
                border={{width: border, color: context.theme.backgroundColor}} 
                fontSize={icon.fontSize} 
                bgColors={[Colors.primary, Colors.secondary]} 
                textColor={'#fff'}
                transition={{direction: 'vertical', duration: 5}} 
                onPress={icon.onPress}
                style={image !== undefined ? {marginLeft: -marginLeft / 1.4}: {}} />
            );
        } else {
            return(
                <LineCircleIcon 
                icon={icon.i} 
                size={icon.size} 
                border={{width: border, color: context.theme.backgroundColor}} 
                fontSize={icon.fontSize} 
                bgColors={[Colors.primary, Colors.secondary]} 
                textColor={Colors.primary}
                transition={{direction: 'vertical', duration: 5}} 
                onPress={icon.onPress}
                style={image !== undefined ? {marginLeft: -marginLeft / 1.4}: {}} />
            );
        }
    }

    return(
        <View style={[style, styles.container]}>
            <View style={[styles.circlesContainer, {marginTop: -marginTop}]}>
                <CircleImage 
                size={image.size} 
                border={border} 
                url={image.url} 
                transition={{direction: 'vertical', duration: 7}} 
                style={{zIndex: 2}} />
                {circleIcon()}
            </View>
            <View style={[styles.textContainer, {paddingBottom: paddingBottom}]}>
                <Text style={[{color: context.theme.titleColor}, styles.text, font.title]}>{name}</Text>
                <Text style={[{color: context.theme.textColor}, styles.text, font.text]}>{desc}</Text>
            </View>
            <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                start={[0, 1]} end={[1, 0]}
                style={styles.statsContainer}>
                    <View style={styles.stats}>
                        <Ionicons name={'md-create'} size={20} color={'#fff'} />
                        <Text style={[font.text, styles.statsText]}>{entries}</Text>
                    </View>
                    <View style={styles.stats}>
                        <Ionicons name={'ios-eye'} size={20} color={'#fff'} />
                        <Text style={[font.text, styles.statsText]}>{views}</Text>
                    </View>
                    <View style={styles.stats}>
                        <Ionicons name={'ios-heart'} size={20} color={'#fff'} />
                        <Text style={[font.text, styles.statsText]}>{likes}</Text>
                    </View>
            </LinearGradient>
        </View>
    );
}

User.defaultProps = defaultProps;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circlesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    textContainer: {
        paddingLeft: 40,
        paddingRight: 40,
    },
    image: {
        width: '100%', 
        height: 200,
    },
    text: {
        textAlign: 'center',
        marginBottom: 15,
    },
    statsContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 60,
        paddingRight: 60,
        marginTop: 30,
    },
    stats: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    statsText: {
        fontFamily: 'montserrat-medium',
        color: '#fff',
        fontSize: 16,
    }
});