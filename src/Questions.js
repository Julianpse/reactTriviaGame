import React, { Component } from 'react';

export const QuestionGenerator = (props) => {
  return(
    <div>
      <h1>{props.question}</h1>
      <h3>{props.category}</h3>
      <ul>
      </ul>
    </div>
  );
}

export const AnswersGenerator = (props) => {
  return(
      <li>{props.answers}</li>
    );
}
