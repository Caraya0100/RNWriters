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
    grab: {size: 0.3},
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
    const translate = useRef(initialTranslate(props));
    //const [current, setCurrent] = useState(props.initialItem);
    const item = useRef(props.initialItem);
    const [panResponder, pan] = usePanResponder({
        addPanListener: (progress) => {
            let xy = 
            translate.current[item.current].setValue(updateTranslate({
                itemIdx: item.current,
                pan: progress,
                current: item.current,
                horizontal: props.horizontal
            }));

            if (_forthcoming >= 0 && _forthcoming < items.length && _forthcoming !== item.current) {
                translate.current[_forthcoming].setValue(updateTranslate({
                    itemIdx: _forthcoming,
                    pan: progress,
                    current: item.current,
                    horizontal: props.horizontal
                }));
            }
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
            _distance = props.horizontal ? gestureState.dx : gestureState.dy;
            _forthcoming = _distance < 0 ? item.current + 1 : item.current - 1;

            return true;
        },
        onPanResponderRelease: (evt, gestureState) => {
            const size = props.horizontal ? layout.window.width : layout.window.height;

            if (Math.abs(_distance) >= (size * props.resilience)) {
                if (_forthcoming >= 0 && _forthcoming < items.length) {
                    Animated.timing(
                        translate.current[item.current],
                        {
                            toValue: {
                                x: props.horizontal ?  _distance < 0 ? -layout.window.width : layout.window.width / 2 : 0, 
                                y: !props.horizontal ? _distance < 0 ? -layout.window.height : layout.window.height / 2 : 0
                            },
                            duration: 300
                        },
                    ).start();

                    Animated.timing(
                        translate.current[_forthcoming],
                        {
                            toValue: { x: 0, y: 0},
                            duration: 300
                        },
                    ).start();

                    item.current = _forthcoming;
                } else {
                    Animated.spring(
                        translate.current[item.current],
                        {toValue: {x: 0, y: 0}},
                    ).start();
                }
            } else {
                Animated.spring(
                    translate.current[item.current],
                    {toValue: {x: 0, y: 0}},
                ).start();
            }
        },
        onPanResponderTerminate: (evt, gestureState) => {
        },
    }, [props.resilience, props.horizontal, items]);
    
    const content = [];
    
    for (let i = 0; i < items.length; i++) {
        const itemStyles = [
            props.itemStyle,
            styles.itemContainer, 
            {transform: translate.current[i].getTranslateTransform()},
            {zIndex: items.length - i}
        ];

        content.push(
            <Animated.View key={i} style={itemStyles}>
                {props.renderItem({item: items[i], index: i})}
            </Animated.View>
        );
    }

    return <View style={[styles.container, props.style]} {...panResponder.panHandlers}>{content}</View>
}

Slider.defaultProps = defaultProps;

function initialTranslate({initialItem, data, horizontal}) {
    const translate = [];

    for (let i = 0; i < data.length; i++) {
        translate.push(new Animated.ValueXY(updateTranslate({
            itemIdx: i,
            pan: {x: 0, y: 0},
            current: initialItem,
            horizontal
        })));
    }

    return translate;
}

function updateTranslate({itemIdx, pan, current, horizontal}) {
    let drag = 0;
    let axis = horizontal ? 'x' : 'y';

    if (itemIdx < current) {
        drag = horizontal ? -layout.window.width : -layout.window.height;

        if (itemIdx === (current - 1)) {
            const speedUp = pan[axis] * 2;
            drag += speedUp;
        }
    } else if (itemIdx > current) {
        drag = horizontal ? layout.window.width / 2 : layout.window.height / 2;

        if (itemIdx === (current + 1)) {
            const slowDown = pan[axis] * 0.5;
            drag += slowDown;
        }
    } else {
        drag = pan[axis];
    }

    if (horizontal) return {x: drag, y: 0};
    
    return {x: 0, y: drag};
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
        right: 0,
        bottom: 0,
        left: 0,
    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    }
});