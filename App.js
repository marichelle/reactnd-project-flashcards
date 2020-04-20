import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import AppNav from './components/AppNav';
import { handleGetDecks } from './actions';
import reducer from './reducers';

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default class App extends Component {
  componentDidMount() {
    store.dispatch(handleGetDecks());
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ height: 50 }} />
        <AppNav />
      </Provider>
    );
  }
}
