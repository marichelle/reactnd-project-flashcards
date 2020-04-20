import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { handleSaveDeck } from '../actions';
import {
  borderRadius,
  primary,
  tertiary,
  muted,
  buttonFontSize,
  buttonFontWeight,
} from '../utils/theme';

class NewDeck extends Component {
  state = {
    title: '',
  };

  handleChangeText = (text) => {
    this.setState(() => ({
      title: text,
    }));
  };

  handleOnPress = () => {
    const { dispatch, navigation } = this.props;
    const { title } = this.state;

    if (title.length) {
      // dispatch action to update AsyncStorage and Redux
      dispatch(handleSaveDeck(title));

      // clear local state
      this.setState(() => ({
        title: '',
      }));

      // return to Decks view
      navigation.navigate('Deck', { id: title });
    } else {
      Alert.alert('Enter a title');
    }
  };

  render() {
    const { title } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          maxLength={40}
          onChangeText={(text) => this.handleChangeText(text)}
          placeholder={'Deck Title'}
          value={title}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleOnPress}>
          <Text style={styles.buttonText}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: primary,
    fontSize: 46,
    textAlign: 'center',
  },
  input: {
    borderColor: primary,
    borderRadius: borderRadius,
    borderWidth: 1,
    margin: 40,
    padding: 10,
    width: 340,
    height: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: primary,
    borderColor: primary,
    borderRadius: borderRadius,
    borderWidth: 1,
    padding: 10,
  },
  buttonText: {
    color: tertiary,
    fontSize: buttonFontSize,
    fontWeight: buttonFontWeight,
  },
});

export default connect()(NewDeck);
