import {useState, useEffect, useRef} from 'react';
import {
    PanResponder,
    Animated,
} from 'react-native';

export function usePanResponder({
    addPanListener,
    onMoveShouldSetPanResponder,
    onPanResponderGrant, 
    onPanResponderMove, 
    onPanResponderRelease, 
    onPanResponderTerminate,
    x = 0, 
    y = 0
}, dependencies = []) {
    const pan = useRef(new Animated.ValueXY({x: x, y: y})).current;
    const [panResponder, setPanResponder] = useState(PanResponder.create({}));

    useEffect(() => {
        const listenerId = pan.addListener((progress) => {
            addPanListener(progress);
        });

        setPanResponder(PanResponder.create({
            onMoveShouldSetPanResponder: onMoveShouldSetPanResponder,
            onPanResponderGrant: onPanResponderGrant,
            onPanResponderMove: (evt, gestureState) => {
                //const track = onPanResponderMove(evt, gestureState);

                    return Animated.event([
                        null, { dx: pan.x, dy: pan.y }],
                        {listener: (evt, gestureState) => {
                            onPanResponderMove(evt, gestureState);
                        }}
                    )(evt, gestureState);
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: onPanResponderRelease,
            onPanResponderTerminate: onPanResponderTerminate,
            onShouldBlockNativeResponder: (evt, gestureState) => true,
        }));
        
        return(() => {
            pan.removeListener(listenerId);
        });
    }, dependencies);

    return [panResponder, pan];
}