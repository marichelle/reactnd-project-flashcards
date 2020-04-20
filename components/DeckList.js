import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

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
    borderColor: 'black',
    borderWidth: 1,
    height: 220,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  itemTitle: {
    fontSize: 36,
  },
  itemCards: {
    fontSize: 20,
  },
});

function mapStateToProps(state) {
  return { decks: state };
}

export default connect(mapStateToProps)(DeckList);
