import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import Constants from 'expo-constants';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import AppNav from './components/AppNav';
import { handleGetDecks } from './actions';
import reducer from './reducers';
import { setLocalNotification } from './utils/helpers';
import { primary } from './utils/theme';

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
    store.dispatch(handleGetDecks());
  }

  render() {
    const statusBarHeight =
      Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: primary,
              height: statusBarHeight,
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
