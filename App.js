import React from 'react';
import { Provider } from "react-redux";

import store from './store/Store';
import LoadingScreen from './screens/LoadingScreen';

export default function App(props) {
  return (
    <Provider store={store}>
      <LoadingScreen/>
    </Provider>
  );
}