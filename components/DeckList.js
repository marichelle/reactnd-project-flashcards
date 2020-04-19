import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class DeckList extends Component {
  renderItem = (deck) => {
    const { questions, title } = deck;

    return (
      <View key={title} style={[styles.item]}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemCards}>{questions.length} cards</Text>
      </View>
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

function mapStateToProps(state) {
  return { decks: state };
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
    marginTop: 10,
    marginBottom: 10,
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

export default connect(mapStateToProps)(DeckList);
