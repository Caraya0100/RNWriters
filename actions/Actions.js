import { 
    CLEAN_STATE,
    ENTRIES_REQUESTED,
    ENTRIES_SUCCEEDED,
    ENTRIES_FAILED,
} from "../constants/ActionTypes";


export function getEntries() {
    return { type: ENTRIES_REQUESTED };
}

export function setEntries(payload) {
    return { type: ENTRIES_SUCCEEDED, payload: payload };
}

export function setErrorGetEntries(payload) {
    return { type: ENTRIES_FAILED, payload: payload };
}

export function cleanState() {
    return { type: CLEAN_STATE };
};