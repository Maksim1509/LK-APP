import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import './index.scss';
import reducer from './slices';
import App from './components/App';

const preloadedState = {
  userInfo: {
    userName: null,
    id: null,
  },
  contactsInfo: {
    userContacts: [],
  },
};

export default () => {
  const store = configureStore({
    reducer,
    preloadedState,
  });

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};
