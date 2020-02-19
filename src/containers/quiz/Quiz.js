import React, { Component } from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import QuizFinished from '../../components/QuizFinished/QuizFinished';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, quizRetry } from '../../store/actions/quiz'
import classes from './Quiz.module.css';

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.quizRetry()
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer at all questions</h1>
          {
            this.props.loading || !this.props.quiz
              ? <Spinner />
              : this.props.quizFinished
                ? <QuizFinished
                    results={this.props.results}
                    quiz={this.props.quiz}
                    onRetry={this.props.quizRetry}
                  />
                : <ActiveQuiz
                    question={this.props.quiz[this.props.activeQuestion].question}
                    answers={this.props.quiz[this.props.activeQuestion].answers}
                    onAnswerClick={this.props.quizAnswerClick}
                    currentQuestion={this.props.activeQuestion + 1}
                    quizLength={this.props.quiz.length}
                    answState={this.props.answerState}
                  />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.quiz.results,
    activeQuestion: state.quiz.activeQuestion,
    quizFinished: state.quiz.quizFinished,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    quizRetry: () => dispatch(quizRetry())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);