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

import { handleAddCardToDeck } from '../actions';

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
    const { dispatch, id, navigation } = this.props;
    const { question, answer } = this.state;

    if (question.length && answer.length) {
      // dispatch action to update AsyncStorage and Redux
      dispatch(
        handleAddCardToDeck(id, {
          question,
          answer,
        })
      );

      // clear local state
      this.setState(() => ({
        question: '',
        answer: '',
      }));

      // return to Deck view
      navigation.navigate('Deck', { id });
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
        <TouchableOpacity style={styles.button} onPress={this.handleOnPress}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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

function mapStateToProps({}, props) {
  const {
    route: {
      params: { id },
    },
  } = props;

  return {
    id,
  };
}

export default connect(mapStateToProps)(NewCard);
