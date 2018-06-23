import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import { Button } from 'reactstrap';

let buttonColor = "white"


const answerStyle = {
  font : 'inherit',
  backgroundColor : buttonColor,
  border: '1px solid',
  padding: 8,
  margin: 'auto',
  marginBottom: 10,
  cursor: 'pointer',
  listStyleType: 'none',
  textAlign: 'center',
  width: '50%',
  marginLeft: '24%',
  height: 60
}

export const Header = (props) => {
  return(
      <h1>Trivia Game</h1>
  )
}

export const StartGame = (props) => {
  return(
    <Col xs="auto">
      <Jumbotron className = "startEndGameBox">
        <h1>Welcome to Trivia!</h1>
        <h3>Test Your Knowledge in 10 Questions! How many can you get right?</h3>
        <Button className = 'startButton' onClick = {props.click} color="danger">Play</Button>
      </Jumbotron>
    </Col>
  )
}

export const ScoreGenerator = (props) => {
  return(
    <div className = "scoreBox">
      <div className = "block-left">
        <p>Question Number: {props.count + 1}/10</p>
      </div>
      <div className = "block-right">
        <p>Your Score: {props.correctCount}</p>
      </div>
    </div>
  )
}

export const QuestionGenerator = (props) => {
  if (props.count < 10) {
    return(
      <div>
        <p><b>Category:</b> {props.category}</p>
        <h1 dangerouslySetInnerHTML={{ __html: props.question }} />
        <br />
      </div>
    );
  } else
  return <EndGame />
}

export const AnswerGenerator = (props) => {

  let myStyle = {...answerStyle};
  let answerId = parseInt(props.id);

  //if statement below fixes the problem of where props return undefined when passed
  let answer = null;
  let correctAnswer = null;
  let color = null;

  if (props.answers) {
    answer = props.answers[answerId];
    correctAnswer = props.correctAnswer;
    myStyle.backgroundColor = props.color;
  }

  if (props.count < 10) {
    return (
      <div className = "answerChoices">
        <Col>
          <li dangerouslySetInnerHTML={{ __html: answer }} style = {myStyle} onClick = {(e) => {props.click(e, answer, answerId);}}/>
        </Col>
      </div>
     );
   } else {
     return null;
   }
}

export const ButtonGenerator = (props) => {
  if (props.count < props.question.length -1){
    return (
      <Button className = 'nextButton' onClick= {props.clickNextQuestion} color="danger"> Next Question </Button>
    )
  } else
    return (
      <Button className = 'nextButton' onClick = {props.clickEndGame} color = "danger">Finish Game</Button>
    )
  }

export const EndGame = (props) => {
  return (
    <Col xs="auto">
      <Jumbotron className = "startEndGameBox">
        <h1>You finished the game!</h1>
        <br/>
        <h2>Your score is: {props.score}/10</h2>
        <br/>
        <Button className = 'endButton' onClick = {props.click} color="danger">Play Again?</Button>
      </Jumbotron>
    </Col>
  );
}
