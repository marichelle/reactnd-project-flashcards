import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { handleDeleteDeck } from '../actions';

class DeckDetail extends Component {
  handleDeleteDeck = () => {
    const { dispatch, id, navigation } = this.props;

    // dispatch action to update AsyncStorage and Redux
    dispatch(handleDeleteDeck(id));

    // return to Deck view
    navigation.navigate('Decks');
  };

  handleOnPress = () => {
    Alert.alert('button pressed');
  };

  render() {
    const { id, deck, navigation } = this.props;

    if (deck === undefined) {
      return (
        <View>
          <Text>This deck no longer exists.</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.deckInfo}>
          <Text style={styles.cardTitle}>{deck.title}</Text>
          <Text style={styles.cardInfo}>{deck.questions.length} cards</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('New Card', { id })}
          >
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'black' }]}
            onPress={this.handleOnPress}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>
              Start Quiz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={this.handleDeleteDeck}
          >
            <Text style={{ color: 'red' }}>Delete Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  deckInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 50,
  },
  cardInfo: {
    color: 'gray',
    fontSize: 22,
  },
  button: {
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: 160,
  },
  buttons: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

function mapStateToProps(decks, props) {
  const {
    route: {
      params: { id },
    },
  } = props;

  return {
    id,
    deck: decks[id],
  };
}

export default connect(mapStateToProps)(DeckDetail);
