import React, { Component, Fragment } from 'react';
import { createControl, validate, validateForm } from '../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Select from '../../components/UI/Select/Select';
import { connect } from 'react-redux';
import classes from './QuizCreator.module.css';
import { createQuizQuestion, finishQuiz } from '../../store/actions/create';

const createOptionControl = (num) => {
  return createControl({
    label: `Option ${num}`,
    errorMessage: 'Option can\'t be empty',
    id: num
  }, { required: true });
};

const createFormControls = () => {
  return {
    question: createControl({
      label: 'Enter the question',
      errorMessage: 'Question can\'t be empty'
    }, { required: true }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  };
};

class QuizCreator extends Component {

  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls()
  }

  submitHandler = (e) => {
    e.preventDefault()
  }

  addQuestionHandler = (e) => {
    e.preventDefault();

    const { question, option1, option2, option3, option4 } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id }
      ]
    }

    this.props.createQuizQuestion(questionItem)

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })

  };

  addQuizHandler = (e) => {
    e.preventDefault();

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })
    
    this.props.finishQuiz()
  }

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation)
    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, idx) => {
      const { value, label, errorMessage, valid, touched, validation } = this.state.formControls[controlName];
      return (
        <Fragment key={controlName + idx}>
          <Input

            label={label}
            value={value}
            valid={valid}
            shouldValidate={!!validation}
            touched={touched}
            errorMessage={errorMessage}
            onChange={(event) => this.changeHandler(event.target.value, controlName)}
          />
          {idx === 0 ? <hr /> : null}
        </Fragment>

      )
    })
  }

  onChangeSelectHandler = (e) => {
    this.setState({
      rightAnswerId: +e.target.value
    });
  };

  render() {
    const select = <Select
      label="Choose the right answer"
      value={this.state.rightAnswerId}
      onChange={this.onChangeSelectHandler}
      options={[
        { text: 1, value: "1" },
        { text: 2, value: "2" },
        { text: 3, value: "3" },
        { text: 4, value: "4" },
      ]}
    />
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Quiz Creator</h1>
          <form onSubmit={this.submitHandler}>

            {this.renderInputs()}

            {select}
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add question
            </Button>
            <Button
              type="success"
              onClick={this.addQuizHandler}
              disabled={this.props.quiz.length === 0}
            >
              Add quiz
          </Button>

          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    quiz: state.create.quiz
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishQuiz: () => dispatch(finishQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)