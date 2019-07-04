import { takeEvery, call, put } from "redux-saga/effects";

import { 
  ENTRIES_REQUESTED,
  ENTRIES_SUCCEEDED,
  ENTRIES_FAILED,
} from "../constants/ActionTypes";
import { 
  setEntries,
  setErrorGetEntries,
} from "../actions/Actions";
import * as entries from "../api/Entries";

export default function* watcherSaga() {
  yield takeEvery(ENTRIES_REQUESTED, fetchEntries);
}

function* fetchEntries() {
  try {
    const payload = yield call(entries.getAll);
    
    yield put(setEntries(payload));
  } catch (e) {
    yield put(setErrorGetEntries(e));
  }
}


