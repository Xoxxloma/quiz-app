import React from 'react';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';
import classes from './QuizFinished.module.css';

const QuizFinished = props => {
  const successCount = Object.values(props.results).reduce((acc, value) => (value === 'success' ? acc + 1 : acc), 0)
  return (
    <div className={classes.QuizFinished}>
      <ul>
        {props.quiz.map(({ question, id }, idx) => {
          const cls = [
            'fa',
            props.results[id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[id]]
          ]
          return (
            <li key={idx}>
              <strong>{idx + 1}</strong>.&nbsp;
            {question}
              <i className={cls.join(' ')} />
            </li>
          )
        })
        }
      </ul>
      <p>Correct {successCount} from {props.quiz.length}</p>
      <div>
        <Button onClick={props.onRetry} type="primary">
          Try again
        </Button>
        <Link to={'/'}>
          <Button type="success">Finish</Button>
        </Link>
      </div>
    </div>
  )
}

export default QuizFinished;