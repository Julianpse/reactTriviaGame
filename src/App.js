import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Jumbotron } from 'reactstrap';
import { Button } from 'reactstrap';
import {QuestionGenerator} from './Questions';
import {AnswerGenerator} from './Questions';
import {Header} from './Questions';
import {ScoreBox} from './Questions';


class App extends Component {
  constructor(){
    super()
    this.state = {
      question:[],
      category: [],
      answerChoices: [],
      correctAnswer: [],
      count: 0,
      correctCount: 0,
      colors : ['white', 'white', 'white', 'white'],
      status: '',
      disabled: false,
      isCorrect: true
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
         correctAnswer : correctAnswer,
         disabled: false
       })
     })
   }


 nextQuestionHandler = (event) => {
   if (this.state.count < this.state.question.length){
     this.setState({
         count: this.state.count + 1 ,
         colors : ['white', 'white', 'white', 'white'],
         disabled: false
     });
    }
  }


  checkAnswerHandler = (event, ans, ansId) => {
    let correctAnswer = this.state.correctAnswer[this.state.count]
    let answers = this.state.answerChoices[this.state.count]
    let count = this.state.correctCount
    let red = 'rgb(255,179,179)'
    let green = 'rgb(144,238,144)'
    let colors = [...this.state.colors];

    if(!this.state.disabled){
        this.setState({
          disabled: true
        });

      if (correctAnswer === ans) {
        //correct answer
        let color = green
        colors[parseInt(ansId)] = green;
        this.setState({
          correctCount: count + 1,
          isCorrect: true
        })

      } else {
        //incorrect answer
        let color = red
        colors[parseInt(ansId)] = red;
        this.setState({isCorrect:false})
      }

      this.setState({colors: colors});
    }
  }


  render() {

    // TODO add this if statement in after the welcome screen is added
    // if (this.state.status === 'started') {
      return (
        <div>
          <div className = "App-header">
            <Header />
            <ScoreBox
              count = {this.state.count}
              correctCount = {this.state.correctCount}
            />
          </div>
          <Jumbotron>
          <div className ="question_container">
            <QuestionGenerator
               question = {this.state.question[this.state.count]}
               category = {this.state.category[this.state.count]}
               answers = {this.state.answerChoices[this.state.count]}
             />
             <ul>
               <div className = "answers">
                 <AnswerGenerator
                   correctAnswer = {this.state.correctAnswer[this.state.count]}
                   answers = {this.state.answerChoices[this.state.count]}
                   click = {this.checkAnswerHandler}
                   id = '0'
                   color = {this.state.colors[0]}
                   disabled={this.state.isButtonDisabled}
                />
                 <AnswerGenerator
                   answers = {this.state.answerChoices[this.state.count]}
                   click = {this.checkAnswerHandler}
                   id = '1'
                   color = {this.state.colors[1]}
                   disabled={this.state.isButtonDisabled}
                 />
                 <AnswerGenerator
                   answers = {this.state.answerChoices[this.state.count]}
                   click = {this.checkAnswerHandler}
                   id = '2'
                   color = {this.state.colors[2]}
                   disabled={this.state.isButtonDisabled}
                 />
                 <AnswerGenerator
                   answers = {this.state.answerChoices[this.state.count]}
                   click = {this.checkAnswerHandler}
                   id = '3'
                   color = {this.state.colors[3]}
                   disabled={this.state.isButtonDisabled}
                 />
                 <div className ="answerStatus">
                   {this.state.disabled && !this.state.isCorrect ? <h5>Sorry, the correct answer is {this.state.correctAnswer[this.state.count]}</h5> : null}
                   {this.state.disabled && this.state.isCorrect ? <h5>You got it, dude!</h5> : null}
                </div>
               </div>
             </ul>
             <Button className = 'nextButton' onClick= {this.nextQuestionHandler} color="danger">Next Question</Button>
          </div>
        </Jumbotron>
        </div>
      );


  //     return <div>click me</div>
  // }
}

}
export default App;
