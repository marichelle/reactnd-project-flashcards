import React, { Component } from 'react';
import { NavigationContainer, StyleSheet } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import DeckDetail from './DeckDetail';
import DeckList from './DeckList';
import NewCard from './NewCard';
import NewDeck from './NewDeck';
import Quiz from './Quiz';
import { primary, tertiary } from '../utils/theme';

const StackNav = createStackNavigator();
const TabNav = createBottomTabNavigator();

const DecksTab = () => (
  <StackNav.Navigator>
    <StackNav.Screen
      name="Decks"
      component={DeckList}
      options={headerOptions}
    />
    <StackNav.Screen
      name="New Deck"
      component={NewDeck}
      options={headerOptions}
    />
    <StackNav.Screen
      name="Deck"
      component={DeckDetail}
      options={headerOptions}
    />
    <StackNav.Screen
      name="New Card"
      component={NewCard}
      options={headerOptions}
    />
    <StackNav.Screen name="Quiz" component={Quiz} options={headerOptions} />
  </StackNav.Navigator>
);

class AppNav extends Component {
  render() {
    return (
      <NavigationContainer>
        <TabNav.Navigator>
          <TabNav.Screen name="Decks" component={DecksTab} />
          <TabNav.Screen name="New Deck" component={NewDeck} />
        </TabNav.Navigator>
      </NavigationContainer>
    );
  }
}

const headerOptions = {
  headerStyle: {
    backgroundColor: primary,
  },
  headerTintColor: tertiary,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default AppNav;
