/* eslint-disable react/prop-types */
import React from 'react';

class SignUpForm1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render () {

    let textInputHandler = this.props.textInputHandler;
    let radioInputHandler = this.props.radioInputHandler;
    let submitHandler = this.props.submitHandler;
    let fields = this.props.fields;
    let usernameAvailable = fields.verifySignUpForm1Result[0]
    let emailAvailable = fields.verifySignUpForm1Result[1]

    return (
      <div id="sign-up-form-1">
      <form id="changeToSignUpForm2" onSubmit={submitHandler}>
        <div>
          <label>
            First Name:
            <input name="first-name" id="firstName" type="text" onChange={textInputHandler} value={fields.firstName}></input>
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input name="last-name" id="lastName" type="text" onChange={textInputHandler} value={fields.lastName}></input>
          </label>
        </div>
        <div>
          <label>
            User Name:
            {/* needs regex */}
            <input name="username" id="userName" onChange={textInputHandler} value={fields.userName} required></input>
            {usernameAvailable}
          </label>
        </div>
        <div>
          <label>
            Password (8 characters minimum):
            <input name="password" id="password" type="password" onChange={textInputHandler} value={fields.password} minLength="8" required></input>
          </label>
        </div>
        <div>
          <label>
            Confirm Password:
            <input name="passwordConfirm" id="passwordConfirm" type="password" onChange={textInputHandler} value={fields.passwordConfirm} minLength="8" required></input>
          </label>
        </div>
        <div>
          <label>
            Email address:
            <input name="email" id="email" type="text" onChange={textInputHandler} value={fields.email} required></input>
          </label>
          {emailAvailable}
        </div>
        Sign up as:
        <div>
          <label>
            Film-Maker
            <input name="signing-up-as" type="radio" onChange={radioInputHandler} value="film-maker" required></input>
          </label>
          <label>
            Composer
            <input name="signing-up-as" type="radio" onChange={radioInputHandler} value="composer" required></input>
          </label>
          <input name="submit" type="submit" value="Next"></input>
        </div>
      </form>
    </div>
    )
  }
}

export default SignUpForm1