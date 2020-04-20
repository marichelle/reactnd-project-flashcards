import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import DeckDetail from './DeckDetail';
import DeckList from './DeckList';
import NewCard from './NewCard';
import NewDeck from './NewDeck';

const StackNav = createStackNavigator();
const TabNav = createBottomTabNavigator();

const Decks = () => (
  <StackNav.Navigator>
    <StackNav.Screen name="Decks" component={DeckList} />
    <StackNav.Screen name="Deck" component={DeckDetail} />
    <StackNav.Screen name="New Card" component={NewCard} />
    <StackNav.Screen name="New Deck" component={NewDeck} />
  </StackNav.Navigator>
);

class AppNav extends Component {
  render() {
    return (
      <NavigationContainer>
        <TabNav.Navigator>
          <TabNav.Screen name="Decks" component={Decks} />
          <TabNav.Screen name="New Deck" component={NewDeck} />
        </TabNav.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNav;
