import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DeckList from './DeckList';
import NewDeck from './NewDeck';

const Tab = createBottomTabNavigator();

class AppNav extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Decks" component={DeckList} />
          <Tab.Screen name="New Deck" component={NewDeck} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNav;
