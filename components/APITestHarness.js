import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import {
  handleAddCardToDeck,
  handleDeleteDeck,
  handleGetDecks,
  handleResetDecks,
  handleSaveDeck,
} from '../actions';
import { getDeck } from '../utils/api.js';

class APITestHarness extends Component {
  state = {
    output: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(handleGetDecks());
  }

  clearState = () =>
    this.setState(() => ({
      output: '',
    }));

  handleGetDecks = () => {
    const { dispatch } = this.props;

    this.clearState();
    dispatch(handleGetDecks());
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
    const title = 'New Deck';

    this.clearState();
    dispatch(handleSaveDeck(title));
  };

  handleDeleteDeck = () => {
    const { dispatch } = this.props;
    const title = 'New Deck';

    this.clearState();
    dispatch(handleDeleteDeck(title));
  };

  handleAddCard = () => {
    const { dispatch } = this.props;
    const id = 'React';
    const card = {
      question: 'Why do birds suddenly appear?',
      answer: 'They long to be close to you',
    };

    this.clearState();
    dispatch(handleAddCardToDeck(id, card));
  };

  handleResetDecks = () => {
    const { dispatch } = this.props;

    this.clearState();
    dispatch(handleResetDecks());
  };

  render() {
    const { decks } = this.props;
    const { output } = this.state;

    return (
      <ScrollView style={styles.container}>
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
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleResetDecks}
          >
            <Text style={styles.buttonText}>resetDecks()</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 26, textAlign: 'center' }}>REDUX:</Text>
        <Text style={styles.output}>{JSON.stringify(decks)}</Text>
        {output !== '' && (
          <>
            <Text style={{ fontSize: 26, textAlign: 'center' }}>OUTPUT:</Text>
            <Text style={styles.output}>{JSON.stringify(output)}</Text>
          </>
        )}
      </ScrollView>
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

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(APITestHarness);
