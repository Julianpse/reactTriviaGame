import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Jumbotron } from 'reactstrap';
import { Button } from 'reactstrap';
import { StartGame } from './Components';
import { Header } from './Components';
import { ScoreGenerator } from './Components';
import { QuestionGenerator } from './Components';
import { AnswerGenerator } from './Components';
import { ButtonGenerator } from './Components';
import { EndGame } from './Components';



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
      gameStatus: 'notStarted',
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

startClickHandler = (event) => {
  event.preventDefault();
  this.setState({gameStatus: 'started', count: 0});
}

endGameHandler = (event) => {
  event.preventDefault();
  this.setState({gameStatus: 'finished'});
}

 nextQuestionHandler = (event) => {
   if (this.state.count < this.state.question.length -1){
     this.setState({
         count: this.state.count + 1 ,
         colors : ['white', 'white', 'white', 'white'],
         disabled: false
     });
     console.log(this.state.gameStatus);
   } else if (this.state.count == this.state.question.length -1){
     this.setState({
       gameStatus: 'finished'
     });
   }
  }


  checkAnswerHandler = (event, ans, ansId) => {
    let correctAnswer = this.state.correctAnswer[this.state.count]
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
        colors[parseInt(ansId)] = color;
        this.setState({
          correctCount: count + 1,
          isCorrect: true
        })

      } else {
        //incorrect answer
        let color = red
        colors[parseInt(ansId)] = color;
        this.setState({isCorrect:false})
      }

      this.setState({colors: colors});
    }
  }


  render() {

    let _correctAnswer = {__html: this.state.correctAnswer[this.state.count]}

   if (this.state.gameStatus === 'started') {
        return (
          <div>
            <div className = "App-header">
              <Header />
              <ScoreGenerator
                count = {this.state.count}
                correctCount = {this.state.correctCount}
              />
            </div>
            <Jumbotron className = "gameContainer">
            <div className ="question_container">
              <QuestionGenerator
                 question = {this.state.question[this.state.count]}
                 category = {this.state.category[this.state.count]}
                 answers = {this.state.answerChoices[this.state.count]}
                 count = {this.state.count}
                 click = {this.startClickHandler}
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
                   count = {this.state.count}
                />
                 <AnswerGenerator
                   answers = {this.state.answerChoices[this.state.count]}
                   click = {this.checkAnswerHandler}
                   id = '1'
                   color = {this.state.colors[1]}
                   disabled={this.state.isButtonDisabled}
                   count = {this.state.count}
                 />
                 <AnswerGenerator
                   answers = {this.state.answerChoices[this.state.count]}
                   click = {this.checkAnswerHandler}
                   id = '2'
                   color = {this.state.colors[2]}
                   disabled={this.state.isButtonDisabled}
                   count = {this.state.count}
                 />
                 <AnswerGenerator
                   answers = {this.state.answerChoices[this.state.count]}
                   click = {this.checkAnswerHandler}
                   id = '3'
                   color = {this.state.colors[3]}
                   disabled={this.state.isButtonDisabled}
                   count = {this.state.count}
                 />
                 <div className ="answerStatus">
                   {this.state.disabled && !this.state.isCorrect ? <h5>Sorry, the correct answer is {_correctAnswer.__html}</h5> : null}
                   {this.state.disabled && this.state.isCorrect ? <h5>You got it, dude!</h5> : null}
                </div>
               </div>
             </ul>
             <ButtonGenerator count = {this.state.count} clickNextQuestion= {this.nextQuestionHandler} clickEndGame = {this.endGameHandler} question = {this.state.question}/>
          </div>
        </Jumbotron>
      </div>
        );
      } else if (this.state.gameStatus === 'finished') {
          return (
            <EndGame click = {this.startClickHandler} score = {this.state.correctCount}/>
          )
      } else if (this.state.gameStatus === 'notStarted') {
          return (
          <StartGame click = {this.startClickHandler}/>
          );
      }
    }
  }
export default App;
