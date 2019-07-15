import React, {useState, useReducer, useEffect} from 'react';
import {
    View,
    PanResponder,
    ActivityIndicator,
    Animated,
    Dimensions,
    StyleSheet,
} from 'react-native';

const layout = {
    window: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
};

const numberOfItems = 3;

const defaultProps = {
    data: [],
    initialItem: 0,
    keyExtractor: (item, index) => index,
    renderItem: ({item, index}) => {},
    horizontal: true,
    resilience: 45,
    grab: {size: 0.3},
    loader: {size: 'large', color: 'darkcyan'},
    itemStyle: {},
    style: {},
}

function initialState({data, initialItem, renderItem, horizontal, resilience, loader}) {
    return {
        translate: [
            horizontal ? {x: -layout.window.width, y: 0}: {x: 0, y: -layout.window.height},
            {x: 0, y: 0},
            horizontal ? {x: resilience, y: 0}: {x: 0, y: resilience},
        ],
        items: [
            renderEmptyItem(),
            renderItem({item: data[initialItem], index: initialItem}),
            data.length > 1 && initialItem < (data.length - 1) ? 
                renderItem({item: data[(initialItem + 1)], index: (initialItem + 1)}) : 
                renderLoader(loader.size, loader.color)
        ],
        order: [3, 2, 1],
        current: {
            data: initialItem,
            item: 1,
        }
    }
}

export default function Slider(props) {
    if (!props.data.length) 
        return renderEmptyItem();
        
    const [panResponder, setPanResponder] = useState(PanResponder.create({}));
    const [state, dispatch] = useReducer(reducer, initialState(props));
    let blockSlider = false;

    useEffect(() => {
        console.log('-------createPanResponder-------');
        setPanResponder(createPanResponder({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                if (evt.nativeEvent.pageY > Math.floor(layout.window.height * (1 - props.grab.size))) {
                    return true;
                }

                return false;
            },
            onPanResponderGrant: (evt, gestureState) => {
                //setItems({x: gestureState.dx, y: gestureState.dy});
            },
            onPanResponderMove: (evt, gestureState) => {
                if (!blockSlider) {
                    let distance = gestureState.dx;

                    if (!props.horizontal) distance = gestureState.dy;

                    /*if (Math.abs(distance) > props.resilience) {
                        blockSlider = true;
                        changeCurrentItem();
                    } else*/ 
                        moveItems({
                            distance, 
                            current: state.current.item, 
                            horizontal: props.horizontal,
                            resilience: props.resilience, 
                            dispatch
                        });
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                //setTransform({x: 0, y: 0});
            },
            onPanResponderTerminate: (evt, gestureState) => {
            },
        }));
    }, [state.current.item, props.data, props.renderItem, props.resilience, props.horizontal, props.grab]);

    const content = [];

    state.items.forEach((item, index) => {
        const itemStyles = [
            props.itemStyle,
            styles.itemContainer, 
            itemTranslate(state.translate[index].x, state.translate[index].y),
            itemOrder(state.order[index])
        ]

        content.push(
            <Animated.View 
            key={index} 
            style={itemStyles}>
                {state.items[index]}
            </Animated.View>
        );
    });

    return <View style={[styles.container, props.style]} {...panResponder.panHandlers}>{content}</View>
}

Slider.defaultProps = defaultProps;

function reducer(state, action) {
    switch (action.type) {
        case 'move':
            return {...state, translate: Object.assign(
                [...state.translate], 
                {[action.payload.current.index]: action.payload.current.xy},
                {[action.payload.adjacent.index]: action.payload.adjacent.xy}
            )}
        default:
            throw new Error();
    }
}

function moveItems({distance, current, horizontal, resilience, dispatch}) {
    const prev = prevItem(current);
    const next = nextItem(current);
    const dragResilience = 0.2;
    let drag = resilience + (distance * dragResilience);
    let items = {move: 'current', drag: 'adjacent'};
    let axis = {primary: 'x', secondary: 'y', size: -layout.window.width};
    const payload = {
        current: { index: current, xy: {x: 0, y: 0} },
        adjacent: { index: next, xy: {x: 0, y: 0} }
    };

    if (!horizontal) axis = {primary: 'y', secondary: 'x', size: -layout.window.height};

    if (distance > 0) {
        items = {move: 'adjacent', drag: 'current'};
        payload.adjacent.index = prev;
        drag = distance * dragResilience;
        distance += axis.size;
    }

    payload[items.move].xy[axis.primary] = distance; 
    payload[items.move].xy[axis.secondary] = 0;
    payload[items.drag].xy[axis.primary] = drag; 
    payload[items.drag].xy[axis.secondary] = 0;
    
    dispatch({type: 'move', payload});
}

function changeCurrentItem() {
    console.log('-------changeCurrentItem-------');
}

function nextItem(current) {
    if (++current === numberOfItems) return 0;
    
    return current;
}

function prevItem(current) {
    if (--current < 0) return numberOfItems - 1;
    
    return current;
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

function createPanResponder({
    onMoveShouldSetPanResponder,
    onPanResponderGrant, 
    onPanResponderMove, 
    onPanResponderRelease, 
    onPanResponderTerminate}) {
    return PanResponder.create({
        //onStartShouldSetPanResponder: (evt, gestureState) => true,
        //onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: onMoveShouldSetPanResponder,
        //onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: onPanResponderGrant,
        onPanResponderMove: onPanResponderMove,
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: onPanResponderRelease,
        onPanResponderTerminate: onPanResponderTerminate,
        onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
}

function itemOrder(z) {
    const zIndex = StyleSheet.create({
        style: {
            zIndex: z,
        },
    });

    return zIndex.style;
}

function itemTranslate(x, y) {
    const transform = StyleSheet.create({
        style: {
            transform: [{translateX: x}, {translateY: y}],
        },
    });

    return transform.style;
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