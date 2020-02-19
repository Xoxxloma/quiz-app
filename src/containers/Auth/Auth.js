import React from 'react';
import { validateControl } from '../../containers/form/formFramework'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { auth } from '../../store/actions/auth';
import { connect } from 'react-redux';
import classes from './Auth.module.css';

class Auth extends React.Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Input correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Input correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  handleLogIn = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }

  handleRegister = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
  }

  handleForm = (e) => {
    e.preventDefault();
  }


  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid
    });

    this.setState({
      formControls, isFormValid
    })
  }

  renderInputs() {
    const { formControls } = this.state
    return Object.keys(formControls).map((controlName, idx) => {
      const { value, type, label, errorMessage, valid, touched, validation } = formControls[controlName];
      return (
        <Input
          key={controlName + idx}
          type={type}
          value={value}
          valid={valid}
          label={label}
          touched={touched}
          errorMessage={errorMessage}
          shouldValidate={!!validation}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>
          <form onSubmit={this.handleForm}>
            {this.renderInputs()}
            <Button
              type='success'
              onClick={this.handleLogIn}
              disabled={!this.state.isFormValid}
            >Log In</Button>
            <Button
              type='primary'
              onClick={this.handleRegister}
              disabled={!this.state.isFormValid}
            >Register</Button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth);