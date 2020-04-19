import React, { Component } from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { addDeck } from '../actions';

class NewDeck extends Component {
  state = {
    input: '',
  };

  handleChangeText = (text) => {
    this.setState(() => ({
      input: text,
    }));
  };

  handleOnPress = () => {
    const { dispatch } = this.props;
    const { input } = this.state;

    Keyboard.dismiss();

    if (input.length) {
      dispatch(addDeck(input));
      this.setState(() => ({
        input: '',
      }));
    } else {
      Alert.alert('Enter a title');
    }
  };

  render() {
    const { input } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          maxLength={40}
          onChangeText={(text) => this.handleChangeText(text)}
          placeholder={'Deck Title'}
          value={input}
        />
        <TouchableHighlight style={styles.button} onPress={this.handleOnPress}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
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
    fontSize: 46,
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    margin: 40,
    padding: 10,
    width: 340,
    height: 40,
  },
  button: {
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default connect()(NewDeck);
