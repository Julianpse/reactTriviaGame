import React, { Component } from 'react';
import './App.css';

const scoreStyle =  {
  textAlign: 'left'
};

const answerStyle = {
  font : 'inherit',
  backgroundColor : 'white',
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

//NOTE: Style objects are immutable so these wont work - just saving them for the color codes
// export const toggleAnswerColorCorrect = () => {
//   answerStyle.backgroundColor = 'rgb(144,238,144)'
// }
//
// export const toggleAnswerColorIncorrect = () => {
//   answerStyle.backgroundColor = 'rgb(255,179,179)'
// }


export const Header = (props) => {
  return(
    <div>
      <h1>Trivia Game</h1>
      <p style={scoreStyle}>Question Number: {props.count}/10</p>
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

export const AnswersGenerator = (props) => {
  return(
    <div>
      <ul>
        <li style = {answerStyle} onClick = {props.click}>Answer 1</li>
        <li style = {answerStyle} onClick = {props.click}>Answer 1</li>
        <li style = {answerStyle} onClick = {props.click}>Answer 1</li>
        <li style = {answerStyle} onClick = {props.click}>Answer 1</li>
      </ul>
      <li dangerouslySetInnerHTML={{ __html: props.answers }} />
    </div>
    );
}
