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

import { addCard } from '../actions';

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  };

  handleChangeText = (name, value) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  handleOnPress = () => {
    const { dispatch, id } = this.props;
    const { question, answer } = this.state;

    Keyboard.dismiss();

    if (question.length && answer.length) {
      dispatch(
        addCard(id, {
          question,
          answer,
        })
      );

      this.setState(() => ({
        question: '',
        answer: '',
      }));
    } else {
      Alert.alert('Enter a question and answer');
    }
  };

  render() {
    const { question, answer } = this.state;

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Add Card</Text>
        <CustomTextInput
          style={styles.input}
          maxLength={100}
          name={'question'}
          onChangeText={this.handleChangeText}
          placeholder={'Enter Question'}
          value={question}
        />
        <CustomTextInput
          style={styles.input}
          maxLength={100}
          name={'answer'}
          onChangeText={this.handleChangeText}
          placeholder={'Enter Answer'}
          value={answer}
        />
        <TouchableHighlight style={styles.button} onPress={this.handleOnPress}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

// https://stackoverflow.com/questions/50018039/react-native-getting-name-of-textinput-in-onchange
const CustomTextInput = ({ name, value, onChangeText, ...props }) => (
  <TextInput
    {...props}
    onChangeText={(value) => onChangeText(name, value)}
    value={value}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    margin: 10,
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

export default connect()(NewCard);
