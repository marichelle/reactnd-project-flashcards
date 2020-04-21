import React, { Component } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DeckDetail from './DeckDetail';
import DeckList from './DeckList';
import NewCard from './NewCard';
import NewDeck from './NewDeck';
import Quiz from './Quiz';
import { primary, tertiary, link } from '../utils/theme';

const StackNav = createStackNavigator();
const TabNav =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialBottomTabNavigator();

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

const AndroidTabs = () => (
  <NavigationContainer>
    <TabNav.Navigator
      initialRouteName="Decks"
      activeColor={link}
      barStyle={{ backgroundColor: 'white' }}
    >
      <TabNav.Screen
        name="Decks"
        component={DecksTab}
        options={{
          tabBarLabel: 'Decks',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cards-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <TabNav.Screen
        name="New Deck"
        component={NewDeck}
        options={{
          tabBarLabel: 'New Deck',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
          ),
        }}
      />
    </TabNav.Navigator>
  </NavigationContainer>
);

const IOSTabs = () => <View></View>;

class AppNav extends Component {
  render() {
    return (
      <NavigationContainer>
        <TabNav.Navigator
          initialRouteName="Decks"
          activeColor={link}
          barStyle={{ backgroundColor: 'white' }}
        >
          <TabNav.Screen
            name="Decks"
            component={DecksTab}
            options={{
              tabBarLabel: 'Decks',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="cards-outline"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <TabNav.Screen
            name="New Deck"
            component={NewDeck}
            options={{
              tabBarLabel: 'New Deck',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="plus" color={color} size={26} />
              ),
            }}
          />
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
