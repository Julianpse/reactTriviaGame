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

const correctAnswerStyle = {
  font : 'inherit',
  backgroundColor : 'rgb(144,238,144,30)',
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

const wrongAnswerStyle = {
  font : 'inherit',
  backgroundColor : 'rgb(255, 179, 179)',
  border: '1px solid red',
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
        <li style = {correctAnswerStyle} onClick = {props.click}>Answer 1</li>
        <li style = {wrongAnswerStyle} onClick = {props.click}>Answer 1</li>
        <li style = {answerStyle} onClick = {props.click}>Answer 1</li>
        <li style = {answerStyle} onClick = {props.click}>Answer 1</li>
      </ul>
      <li dangerouslySetInnerHTML={{ __html: props.answers }} />
    </div>
    );
}
