import React, { Component } from 'react';
import {
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
    Keyboard.dismiss();

    this.props.dispatch(addDeck(this.state.input));

    this.setState(() => ({
      input: '',
    }));
  };

  render() {
    const { input } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          maxLength={40}
          onChangeText={(text) => this.handleChangeText(text)}
          placeholder={'Deck Title'}
          value={input}
        />
        <TouchableHighlight style={styles.button} onPress={this.handleOnPress}>
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
});

export default connect()(NewDeck);
