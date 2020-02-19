import React from 'react';
import AnswersList from '../ActiveQuiz/AnswersList/AnswersList';
import classes from './ActiveQuiz.module.css';


const ActiveQuiz = props => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{props.currentQuestion}.</strong>&nbsp;
        {props.question}
        </span>
        <small> {props.currentQuestion} from {props.quizLength}</small>
      </p>
      <AnswersList 
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
        answState={props.answState}
      />
    </div>
  )
}

export default ActiveQuiz;