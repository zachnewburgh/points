import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';

import { Provider } from 'react-redux';
import store from './store';

import { AppContainer } from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  rootElement
);
