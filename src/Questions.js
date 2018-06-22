import React, { Component } from 'react';
import './App.css';

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
  marginLeft: '25%',
  height: 60
}


export const Header = (props) => {
  return(
    <div>
      <h1>Trivia Game</h1>
    </div>
  )
}

export const ScoreBox = (props) => {
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
  return(
    <div>
      <p><b>Category:</b> {props.category}</p>
      <h1 dangerouslySetInnerHTML={{ __html: props.question }} />
      <br />
    </div>
  );
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

  console.log(correctAnswer);
  console.log(props.color);

  return <li dangerouslySetInnerHTML={{ __html: answer }} style = {myStyle} onClick = {(e) => {props.click(e, answer, answerId)}}/>
}
