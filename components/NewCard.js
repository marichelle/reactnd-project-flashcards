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
import {
  primary,
  tertiary,
  borderRadius,
  buttonFontSize,
  buttonFontWeight,
} from '../utils/theme';

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
    const { id } = this.props;
    const { question, answer } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add Card to {id} Deck</Text>
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
  title: {
    color: primary,
    fontSize: 46,
    textAlign: 'center',
  },
  input: {
    borderColor: primary,
    borderRadius: 4,
    borderWidth: 1,
    margin: 10,
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
    fontSize: buttonFontSize,
    fontWeight: buttonFontWeight,
    color: tertiary,
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
