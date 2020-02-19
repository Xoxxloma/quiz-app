import React from 'react';
import { NavLink } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './QuizList.module.css';
import { connect } from 'react-redux';
import {fetchQuizes} from '../../store/actions/quiz'

class QuizList extends React.Component {

  componentDidMount() {
    this.props.fetchQuizes()
  }

  renderQuiz() {
    const { quizes } = this.props
    return quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink
            to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz list</h1>
          {
            this.props.loading && this.props.quizes.length !== 0
              ? <Spinner />
              : <ul>
                  {this.renderQuiz()}
                </ul>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)