import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux"
import store from "./Store" 
import App from './App';
import { composeWithDevTools } from 'redux-devtools-extension';

import ErrorBoundary from './ErrorBoundary';
import {positions,transitions,Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"
const root = ReactDOM.createRoot(document.getElementById('root'));

const alertOptions = {
  timeout: 5000, // time in ms
  position: positions.TOP_CENTER,  // we can also chosse BOttom center
  transition: transitions.SCALE   // we can also chosse FADE
}
root.render(// wrap APP with Alertprovider to use alert anywhere in the App
  <Provider store={store}>
    <ErrorBoundary>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
    <App />
    </AlertProvider>
    </ErrorBoundary>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

