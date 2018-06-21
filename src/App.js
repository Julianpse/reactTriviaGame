import React, { Component } from 'react';
import axios from 'axios';
import {QuestionGenerator} from './Questions';
import {AnswersGenerator} from './Questions';
import {Header} from './Questions';
import { Jumbotron } from 'reactstrap';

class App extends Component {
  constructor(){
    super()
    this.state = {
      question:[],
      category: [],
      answerChoices: [],
      correctAnswer: []
    }

  }

  shuffleAnswers(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


  componentDidMount = () => {
    let questions = [];
    let categories = [];
    let allAnswers = [];
    let correctAnswer = [];
    axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((response) => {
        for (let i=0; i<response.data.results.length; i ++){
          questions.push(response.data.results[i].question)
          categories.push(response.data.results[i].category)
          correctAnswer.push(response.data.results[i].correct_answer)
          allAnswers.push(response.data.results[i].incorrect_answers)
          allAnswers[i].push(correctAnswer[i])
          allAnswers[i] = this.shuffleAnswers(allAnswers[i])
        }

    this.setState({
         question : questions,
         category : categories,
         answerChoices : allAnswers,
         correctAnswer : correctAnswer
       })
     })

   }


// clickHandler = () => {
//    const category = this.state.triviaData[0].category;
//    const question = this.state.triviaData[0].question;
//    const correctAnswer = this.state.triviaData[0].correct_answer;
//    const wrongAnswer = this.state.triviaData[0].incorrect_answers[0];
//
//  }


  render() {

    return (
      <div>
        <div className = "App-header">
          <Header/>
        </div>
        <Jumbotron>
        <div className ="question_container">
          <QuestionGenerator
             question = {this.state.question[0]}
             category = {this.state.category[0]}
             answers = {this.state.answerChoices[0]}
           />
           <AnswersGenerator
             answers = {this.state.answerChoices[0]}
           />
        </div>
      </Jumbotron>
      </div>
    );
  }
}

export default App;
