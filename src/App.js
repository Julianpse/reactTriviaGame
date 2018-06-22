import React, { Component } from 'react';
import axios from 'axios';
import { Jumbotron } from 'reactstrap';
import { Button } from 'reactstrap';
import {QuestionGenerator} from './Questions';
import {AnswerGenerator} from './Questions';
import {Header} from './Questions';


class App extends Component {
  constructor(){
    super()
    this.state = {
      question:[],
      category: [],
      answerChoices: [],
      correctAnswer: [],
      count: 0,
      colors : ['white', 'white', 'white', 'white'],
      status: ''
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


 nextQuestionHandler = (event) => {
   if (this.state.count < this.state.question.length){
     this.setState({
         count: this.state.count + 1,
         colors : ['white', 'white', 'white', 'white']
     });
    }
  }

  checkAnswerHandler = (event, ans, ansId) => {
    let correctAnswer = this.state.correctAnswer[this.state.count]
    let answers = this.state.answerChoices[this.state.count]

    let red = 'rgb(255,179,179)'
    let green = 'rgb(144,238,144)'

    let colors = [...this.state.colors];
      if (correctAnswer === ans) {
        console.log("correct")
        let color = green
        colors[parseInt(ansId)] = green;

      } else {
        console.log("incorrect")
        let color = red
        colors[parseInt(ansId)] = red;
      }

      this.setState({colors: colors});
  }

  render() {
    // TODO add this if statement in after the welcome screen is added
    // if (this.state.status === 'started') {
      return (
        <div>
          <div className = "App-header">
            <Header count = {this.state.count}/>
          </div>
          <Jumbotron>
          <div className ="question_container">
            <QuestionGenerator
               question = {this.state.question[this.state.count]}
               category = {this.state.category[this.state.count]}
               answers = {this.state.answerChoices[this.state.count]}
             />
             <ul>
               <AnswerGenerator
                 correctAnswer = {this.state.correctAnswer[this.state.count]}
                 answers = {this.state.answerChoices[this.state.count]}
                 click = {this.checkAnswerHandler}
                 id = '0'
                 color = {this.state.colors[0]}
               />
               <AnswerGenerator
                 answers = {this.state.answerChoices[this.state.count]}
                 click = {this.checkAnswerHandler}
                 id = '1'
                 color = {this.state.colors[1]}
               />
               <AnswerGenerator
                 answers = {this.state.answerChoices[this.state.count]}
                 click = {this.checkAnswerHandler}
                 id = '2'
                 color = {this.state.colors[2]}
               />
               <AnswerGenerator
                 answers = {this.state.answerChoices[this.state.count]}
                 click = {this.checkAnswerHandler}
                 id = '3'
                 color = {this.state.colors[3]}
               />
             </ul>
             <br/>
             <Button onClick= {this.nextQuestionHandler} color="danger">Next Question</Button>
          </div>
        </Jumbotron>
        </div>
      );
      }

  //     return <div>click me</div>
  // }
}

export default App;
