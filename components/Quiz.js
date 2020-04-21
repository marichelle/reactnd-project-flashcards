import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import {
  primary,
  tertiary,
  success,
  danger,
  link,
  white,
  borderRadius,
  buttonFontSize,
  buttonFontWeight,
  secondary,
} from '../utils/theme';

class Quiz extends Component {
  state = {
    index: 0,
    score: 0,
    view: 'question',
  };

  handleAnswer = (correct, numOfCards) => {
    this.setState((currState) => {
      const next = currState.index + 1;

      return {
        index: next,
        score: correct ? currState.score + 1 : currState.score,
        view: next === numOfCards ? 'results' : 'question',
      };
    });
  };

  handleChangeView = () =>
    this.setState((currState) => ({
      view: currState.view === 'question' ? 'answer' : 'question',
    }));

  restartQuiz = () =>
    this.setState(() => ({
      index: 0,
      score: 0,
      view: 'question',
    }));

  render() {
    const { id, deck, navigation } = this.props;
    const { questions } = deck;
    const { index, score, view } = this.state;
    const currCard = index + 1;
    const numOfCards = questions.length;
    let result = 0;

    if (view === 'results') {
      result = Math.round((score / numOfCards) * 100);
    }

    return (
      <View style={styles.container}>
        {view === 'question' && (
          <View style={styles.view}>
            <Text>
              {currCard} of {numOfCards}
            </Text>
            <Text style={[styles.label, { fontSize: 36 }]}>
              Q. {questions[index].question}
            </Text>
            <TouchableOpacity
              style={{ margin: 10 }}
              onPress={this.handleChangeView}
            >
              <Text style={styles.link}>Show Answer</Text>
            </TouchableOpacity>
          </View>
        )}

        {view === 'answer' && (
          <>
            <View style={styles.view}>
              <Text>
                {currCard} of {numOfCards}
              </Text>
              <Text style={[styles.label, { fontSize: 32 }]}>
                {questions[index].answer}
              </Text>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={this.handleChangeView}
              >
                <Text style={styles.link}>Show Question</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: success }]}
                onPress={() => this.handleAnswer(true, numOfCards)}
              >
                <Text style={[styles.buttonText, { color: white }]}>
                  Correct
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: danger }]}
                onPress={() => this.handleAnswer(false, numOfCards)}
              >
                <Text style={[styles.buttonText, { color: white }]}>
                  Incorrect
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {view === 'results' && (
          <>
            <View style={styles.view}>
              <Text style={[styles.label, { fontSize: 32 }]}>
                Quiz Complete!
              </Text>
              <Text
                style={[
                  styles.score,
                  result > 50 ? { color: success } : { color: danger },
                ]}
              >
                {score} / {numOfCards}
              </Text>
              <Text style={{ color: 'gray', fontSize: 20 }}>CORRECT</Text>
            </View>
            <View style={styles.view}>
              <Text style={[styles.label, { fontSize: 32 }]}>Quiz Result</Text>
              <Text
                style={[
                  styles.score,
                  result > 50 ? { color: success } : { color: danger },
                ]}
              >
                {result}%
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: primary }]}
                onPress={() => navigation.navigate('Deck', { id })}
              >
                <Text style={styles.buttonText}>Back to Deck</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: primary }]}
                onPress={this.restartQuiz}
              >
                <Text style={styles.buttonText}>Restart Quiz</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 25,
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: secondary,
    textAlign: 'center',
  },
  link: {
    color: link,
    fontSize: buttonFontSize,
    fontWeight: buttonFontWeight,
  },
  button: {
    borderRadius: borderRadius,
    margin: 10,
    padding: 10,
    width: 160,
  },
  buttonText: {
    color: tertiary,
    fontSize: buttonFontSize,
    fontWeight: buttonFontWeight,
    textAlign: 'center',
  },
  score: {
    fontSize: 60,
  },
});

function mapStateToProps(state, props) {
  const {
    route: {
      params: { id },
    },
  } = props;

  return {
    id,
    deck: state[id],
  };
}

export default connect(mapStateToProps)(Quiz);
