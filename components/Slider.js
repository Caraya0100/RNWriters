import React, {useState, useRef} from 'react';
import {
    View,
    ActivityIndicator,
    Animated,
    Dimensions,
    StyleSheet,
} from 'react-native';

import {usePanResponder} from '../hooks/PanResponder';

const layout = {
    window: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
};

const defaultProps = {
    data: [],
    initialItem: 0,
    keyExtractor: (item, index) => index,
    renderItem: ({item, index}) => {},
    horizontal: true,
    resilience: 0.15,
    grab: {size: 0.45},
    loader: {size: 'large', color: 'darkcyan'},
    itemStyle: {},
    style: {},
}

export default function Slider(props) {
    if (!props.data.length) 
        return renderEmptyItem();
        
    let _distance = 0;
    let _forthcoming = 0;
    const [items, setItems] = useState([...props.data]);
    const item = useRef(props.initialItem);
    const translate = useRef(new Animated.ValueXY());
    const [panResponder, pan] = usePanResponder({
        addPanListener: (progress) => {
            
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            if (evt.nativeEvent.pageY > Math.floor(layout.window.height * (1 - props.grab.size))) {
                return true;
            }

            return false;
        },
        onPanResponderGrant: (evt, gestureState) => {
        },
        onPanResponderMove: (evt, gestureState) => {
            let move = gestureState.dx + (-layout.window.width * item.current);

            translate.current.setValue({x: move, y: 0});
            //return true;
        },
        onPanResponderRelease: (evt, gestureState) => {
            const size = props.horizontal ? layout.window.width : layout.window.height;
            _distance = props.horizontal ? gestureState.dx : gestureState.dy;

            if (Math.abs(_distance) >= (size * props.resilience)) {
                _forthcoming = _distance < 0 ? item.current + 1 : item.current - 1;
                
                if (_forthcoming >= 0 && _forthcoming < items.length)
                    item.current = _forthcoming;
            }

            Animated.spring(
                translate.current, {toValue: move(item.current, props.horizontal),},
            ).start();
        },
        onPanResponderTerminate: (evt, gestureState) => {
        },
    }, [props.resilience, props.horizontal, items]);
    
    const content = [];

    for (let i = 0; i < items.length; i++) {
        const moveTo = move(i, props.horizontal);
        const itemStyles = [
            props.itemStyle,
            styles.itemContainer, 
            {transform: [{translateX: moveTo.x * -1}, {translateY: moveTo.y * -1}]},
        ];

        content.push(
            <View key={i} style={itemStyles}>
                {props.renderItem({item: items[i], index: i})}
            </View>
        );
    }

    //translate.current = drag(pan, translate.current, props.horizontal);
    let dimensions = {width: layout.window.width * items.length, height: layout.window.height};

    if (!props.horizontal)
        dimensions = {width: layout.window.width, height: layout.window.height * items.length};

    const wrapperStyle = [dimensions, {
        transform: translate.current.getTranslateTransform()
    }];
    
    //if (props.horizontal) wrapperStyle.push({width: layout.window.width * items.length, height: layout.window.height});
    //else wrapperStyle.push({width: layout.window.width, height: layout.window.height * items.length});
    //console.log(wrapperStyle);

    return (
        <View style={[styles.container, props.style]}>
            <Animated.View style={wrapperStyle} {...panResponder.panHandlers}>
                {content}
            </Animated.View>
        </View>
    );
}

Slider.defaultProps = defaultProps;

function drag(pan, current, horizontal) {
    return { 
        x: horizontal ? Animated.add(current.x, pan.x) : 0, 
        y: !horizontal ? Animated.add(current.y, pan.y) : 0, 
    };
}

function move(current, horizontal) {
    return {
        x: horizontal ? -layout.window.width * current : 0, 
        y: !horizontal ? -layout.window.height * current : 0, 
    };
}

function renderEmptyItem() {
    return <View></View>;
}

function renderLoader(size, color) {
    return(
        <View style={[styles.itemContainer, styles.loaderContainer, itemsTranslate(translate.x, translate.y).style]}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        flexGrow: 1,
    },
    itemContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: layout.window.width,
        height: layout.window.height,
    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    }
});