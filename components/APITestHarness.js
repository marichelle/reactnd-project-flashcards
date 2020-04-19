import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { addCard, addDeck, receiveDecks, removeDeck } from '../actions';
import {
  addCardToDeck,
  deleteDeck,
  getDeck,
  getDecks,
  saveDeckTitle,
} from '../utils/api.js';

class APITestHarness extends Component {
  state = {
    output: '',
  };

  componentDidMount() {
    this.handleGetDecks();
  }

  handleDeleteDeck = () => {
    const { dispatch } = this.props;
    const mockData = 'New Deck';

    dispatch(removeDeck(mockData));
    deleteDeck(mockData);
  };

  handleGetDecks = () => {
    const { dispatch } = this.props;

    getDecks().then((result) => {
      dispatch(receiveDecks(result));

      this.setState(() => ({
        output: result,
      }));
    });
  };

  handleGetDeck = () => {
    getDeck('React').then((result) => {
      this.setState({
        output: result,
      });
    });
  };

  handleSaveDeck = () => {
    const { dispatch } = this.props;
    const mockData = 'New Deck';

    dispatch(addDeck(mockData));
    saveDeckTitle(mockData);
  };

  handleAddCard = () => {
    const { dispatch } = this.props;
    const mockId = 'React';
    const mockData = {
      question: 'Why do birds suddenly appear?',
      answer: 'They long to be close to you',
    };

    dispatch(addCard(mockId, mockData));
    addCardToDeck(mockId, mockData);
  };

  render() {
    const { decks } = this.props;
    const { output } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={this.handleGetDecks}>
            <Text style={styles.buttonText}>getDecks()</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleGetDeck}>
            <Text style={styles.buttonText}>getDeck()</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleSaveDeck}>
            <Text style={styles.buttonText}>saveDeckTitle()</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleDeleteDeck}
          >
            <Text style={styles.buttonText}>deleteDeck()</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleAddCard}>
            <Text style={styles.buttonText}>addCardToDeck()</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 26, textAlign: 'center' }}>OUTPUT:</Text>
        <Text style={styles.output}>{JSON.stringify(output)}</Text>
        <Text style={{ fontSize: 26, textAlign: 'center' }}>REDUX:</Text>
        <Text style={styles.output}>{JSON.stringify(decks)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    justifyContent: `center`,
    alignItems: `center`,
    height: 50,
    backgroundColor: 'black',
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  output: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
});

function mapStateToProps(state) {
  console.log('state', state);

  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(APITestHarness);
