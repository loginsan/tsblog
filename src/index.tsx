import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { CookiesProvider } from 'react-cookie';
import reducer from './store';
import './index.css';
import App from './components/App';


/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
const glob = window as any;
const composeEnhancers = glob.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store: Store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(reduxThunk)
  )
);
/* eslint-enable */


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
