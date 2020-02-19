import React from 'react';
import classes from './AnswersListItem.module.css';

const AnswersListItem = props => {
  const cnz = [classes.QuestionItem]
  if (props.answState) {
    cnz.push(classes[props.answState])
  }
  return (
    <li
      className={cnz.join(' ')}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      { props.answer.text }
    </li>
  )
}

export default AnswersListItem;