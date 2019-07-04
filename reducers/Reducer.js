/**
 * Se combinan todos los reductores para crear el reductor raiz.
 * 
 * Como su nombre lo dice, un reductor recude el numero de estados que
 * se modifican en el store, esto lo hace a traves de las acciones.
 */

import { combineReducers } from 'redux';
import search from './Search'
import { CLEAN_STATE } from '../constants/ActionTypes';

const appReducer = combineReducers({
    search,
});

export default (state, action) => {
    if (action.type === CLEAN_STATE) {
        state = undefined;
    }

    return appReducer(state, action);
}