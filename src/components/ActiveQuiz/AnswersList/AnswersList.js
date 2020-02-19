import React from 'react';
import AnswerListItem from './AnswersListItem/AnswersListItem';
import classes from './AnswersList.module.css';

const AnswersList = props => {
  return (
    <ul className={classes.AnswersList}>
      {props.answers.map((answer, idx) => {
        return (
          <AnswerListItem
            key={idx}
            answer={answer}
            onAnswerClick={props.onAnswerClick}
            answState={props.answState ? props.answState[answer.id] : null}
          />
        )
      })}
    </ul>
  )
}

export default AnswersList;