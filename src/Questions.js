import React, { Component } from 'react';
import './App.css';

import { Button } from 'reactstrap';

export const Header = () => {
  return(
      <h1>Trivia Game</h1>
  )
}

export const QuestionGenerator = (props) => {
  return(
    <div>
      <p>Category: {props.category}</p>
      <h1>{props.question}</h1>
      <ul>
      </ul>
    </div>
  );
}

export const AnswersGenerator = (props) => {
  return(
    <div>
      <li>{props.answers}</li>
      <br/>
      <Button color="danger">Next Question</Button>
    </div>
    );
}
