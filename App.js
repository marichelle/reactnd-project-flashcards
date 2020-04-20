import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import Constants from 'expo-constants';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import AppNav from './components/AppNav';
import { handleGetDecks } from './actions';
import reducer from './reducers';
import { primary } from './utils/theme';

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default class App extends Component {
  componentDidMount() {
    store.dispatch(handleGetDecks());
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: primary,
              height: Constants.statusBarHeight,
            }}
          >
            <StatusBar
              backgroundColor={primary}
              barStyle={'light-content'}
              translucent
            />
          </View>
          <AppNav />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
