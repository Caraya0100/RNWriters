import React, {useContext} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

import {font} from '../styles/Styles';
import {ThemeContext} from '../context/Context';
import CircleImage from '../components/CircleImage';
import CircleIcon from './CircleIcon';

export default function Entry(props) {
    const context = useContext(ThemeContext);
    const imageSize = 120;
    const border = 5;
    const marginLeft = 40;

    return(
        <View style={styles.container}>
            <View style={styles.circlesContainer}>
                <CircleImage size={imageSize} border={border} url={props.uimg} style={{zIndex: 3}} />
                <CircleImage size={imageSize} border={border} url={props.image} style={{marginLeft: -marginLeft, zIndex: 2}} />
                <CircleIcon size={imageSize - 20} border={border} fontSize={48} style={{marginLeft: -marginLeft / 1.4}} />
            </View>
            <Text style={[{color: context.theme.titleColor}, styles.text, font.title]}>{props.title}</Text>
            <Text style={[{color: context.theme.textColor}, styles.text, font.text]}>{props.excerpt}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width,
        paddingLeft: 40,
        paddingRight: 40,
    },
    circlesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    text: {
        textAlign: 'center',
        marginBottom: 15,
    }
});