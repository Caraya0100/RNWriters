import React, {useContext} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native';

import {font} from '../styles/Styles';
import Colors from '../constants/Colors';
import {ThemeContext} from '../context/Context';
import CircleImage from '../components/CircleImage';
import CircleIcon from './CircleIcon';

export default function Entry(props) {
    const {
        style, 
        id,
        image, 
        author,
        icon,
        content, 
        border,
        animation,
        navigate
    } = props;
    const context = useContext(ThemeContext);
    const marginLeft = image.size * 0.33;
    let marginTop = 0;
    let paddingBottom = 0;

    if (image.shape === 'rect') {
        marginTop = image.size * 0.5;
        paddingBottom = 40;
    }

    featuredImage = () => {
        if (image.shape === 'rect') {
            return(
                <Image source={{uri: image.url}} resizeMode='cover' style={styles.image} />
            );
        }
    }

    circlefeaturedImage = () => {
        if (image.shape === 'circle') {
            return(
                <CircleImage 
                size={image.size} 
                border={border} 
                url={image.url} 
                transition={{direction: animation, duration: 5.5}} 
                onPress={() => navigate('Entry', {id})} 
                style={{marginLeft: -marginLeft, zIndex: 2}} />
            );
        }
    }

    authorImage = () => {
        if (author.image !== undefined ) {
            return(
                <CircleImage 
                size={image.size} 
                border={border} 
                url={author.image} 
                transition={{direction: animation, duration: 7}} 
                style={{zIndex: 3}}
                onPress={() => navigate('User', {id: author.id})} />
            );
        }
    } 

    return(
        <View style={[style, styles.container]}>
            {featuredImage()}
            <View style={[styles.circlesContainer, {marginTop: -marginTop}]}>
                {authorImage()}
                {circlefeaturedImage()}
                <CircleIcon 
                    icon={icon.i} 
                    size={icon.size} 
                    transition={{direction: animation, duration: 4}} 
                    border={{width: border, color: context.theme.backgroundColor}} 
                    fontSize={icon.fontSize} 
                    bgColors={[Colors.primary, Colors.secondary]} 
                    textColor={'#fff'}
                    onPress={icon.onPress}
                    style={author.image !== undefined ? {marginLeft: -marginLeft / 1.4}: {}} 
                />
            </View>
            <View style={[styles.textContainer, {paddingBottom: paddingBottom}]}>
                <Text style={[{color: context.theme.titleColor}, styles.text, font.title]}>{content.title}</Text>
                <Text style={[{color: context.theme.textColor}, styles.text, font.text]}>{author.name} • {content.date}</Text>
                <Text style={[{color: context.theme.textColor}, styles.text, font.text]}>{content.text}</Text>
            </View>
        </View>
    );
}

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
    }
});