import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import './index.scss';
import authContext from './context';
import reducer from './slices';
import App from './components/App';

export default () => {
  const store = configureStore({
    reducer,
  });

  ReactDOM.render(
    <Provider store={store}>
      <authContext.Provider value={{ user: null }}>
        <App />
      </authContext.Provider>
    </Provider>,
    document.getElementById('root'),
  );
};
