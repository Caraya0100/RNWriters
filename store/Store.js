import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers/Reducer";
import apiSaga from "../sagas/ApiSaga";

const initialiseSagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(initialiseSagaMiddleware));

initialiseSagaMiddleware.run(apiSaga);

export default store;