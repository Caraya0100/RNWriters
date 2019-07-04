import { 
    ENTRIES_SUCCEEDED,
    ENTRIES_FAILED
} from '../constants/ActionTypes';

const initialState = {
    entries: [],
    error: '',
}

export default function contactos(state = initialState, action) {
    switch (action.type) {
        case ENTRIES_SUCCEEDED:
            return { ...state, entries: action.payload };
        case ENTRIES_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}