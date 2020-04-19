import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';

class DeckDetail extends Component {
  handleOnPress = () => {
    Alert.alert('button pressed');
  };

  render() {
    const { id, deck } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.deckInfo}>
          <Text style={styles.cardTitle}>{deck.title}</Text>
          <Text style={styles.cardInfo}>{deck.questions.length} cards</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleOnPress}
          >
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, { backgroundColor: 'black' }]}
            onPress={this.handleOnPress}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>
              Start Quiz
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ margin: 10 }}
            onPress={this.handleOnPress}
          >
            <Text style={{ color: 'red' }}>Delete Deck</Text>
          </TouchableHighlight>
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
    borderColor: 'red',
    borderWidth: 1,
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
  return {
    deck: decks[props.id],
  };
}

export default connect(mapStateToProps)(DeckDetail);
