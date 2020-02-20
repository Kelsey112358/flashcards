import React from 'react';
import {
  flashCardsArray,
  getPercentage,
  getUniqueSet,
  numberOfAnswers,
} from './utils';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardIndexes: getUniqueSet(numberOfAnswers, flashCardsArray.length),
      correctAnswerCount: 0,
      correctAnswerIndex: Math.floor(Math.random() * numberOfAnswers),
      disableWords: [],
      incorrectAnswerCount: 0,
    };
  }
  componentDidMount = () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => this.setState({ json }));
  };

  guess = (answer) => {
    // Guess correctly
    if (answer === this.state.cardIndexes[this.state.correctAnswerIndex]) {
      const cardIndexes = this.state.cardIndexes;
      const correctAnswerIndex = this.state.correctAnswerIndex;
      setTimeout(() => {
        this.setState(() => ({
          cardIndexes,
          correctAnswerIndex,
        }));
      }, 3000);
      this.setState((prevState) => ({
        cardIndexes: getUniqueSet(numberOfAnswers, flashCardsArray.length),
        correctAnswerCount: prevState.correctAnswerCount + 1,
        correctAnswerIndex: Math.floor(Math.random() * numberOfAnswers),
        disableWords: [],
      }));
    } else {
      this.setState((prevState) => ({
        disableWords: [...prevState.disableWords, answer],
        incorrectAnswerCount: prevState.incorrectAnswerCount + 1,
      }));
    }
  };

  render() {
    const {
      cardIndexes,
      correctAnswerCount,
      correctAnswerIndex,
      incorrectAnswerCount,
      json,
    } = this.state;
    const flashCard = flashCardsArray[cardIndexes[correctAnswerIndex]][0];
    return (
      <div className="flash-card">
        <p>{JSON.stringify(json)}</p>
        <p>
          What does <b>{flashCard}</b> mean?
        </p>
        <div className="buttons-group">
          {cardIndexes.map((cardIndex) => (
            <button
              key={cardIndex}
              onClick={() => this.guess(cardIndex)}
              disabled={this.state.disableWords.indexOf(cardIndex) > -1}
            >
              {flashCardsArray[cardIndex][1]}
            </button>
          ))}
        </div>
        <div>
          <p className="count">{`Count: ${correctAnswerCount}`}</p>
          <p>{`Percentage: ${getPercentage(
            correctAnswerCount,
            correctAnswerCount + incorrectAnswerCount
          )}`}</p>
        </div>
      </div>
    );
  }
}

export default App;
