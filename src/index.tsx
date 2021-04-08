import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import reducer from "./store/reducers";
// import { asyncLoadPosts } from "./store/actions";

import './index.css';
import App from './components/App';


/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
const glob = window as any;
const composeEnhancers = glob.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(reduxThunk)
  )
);
/* eslint-enable */


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
