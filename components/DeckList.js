import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { borderRadius, primary, tertiary } from '../utils/theme';

class DeckList extends Component {
  renderItem = (deck) => {
    const { navigation } = this.props;
    const { questions, title } = deck;

    return (
      <TouchableOpacity
        style={styles.item}
        key={title}
        onPress={() => navigation.navigate('Deck', { id: title })}
      >
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemCards}>{questions.length} cards</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { decks } = this.props;

    return (
      <ScrollView style={styles.container}>
        {Object.keys(decks).map((id) => this.renderItem(decks[id]))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary,
    borderRadius: borderRadius,
    height: 140,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  itemTitle: {
    color: tertiary,
    fontSize: 26,
  },
  itemCards: {
    color: tertiary,
    fontSize: 16,
  },
});

function mapStateToProps(decks) {
  const sorted_decks = {};

  // sort decks alphabetically
  Object.entries(decks)
    .sort((a, b) => a > b)
    .forEach(([key, val]) => {
      sorted_decks[key] = val;
    });

  return { decks: sorted_decks };
}

export default connect(mapStateToProps)(DeckList);
