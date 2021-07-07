/* eslint-disable react/prop-types */
import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.signInTextFieldOnChange = this.signInTextFieldOnChange.bind(this);
    this.signInOnSubmit = this.signInOnSubmit.bind(this);
  }
  signInTextFieldOnChange (e) {
    let changedState = {}
    let field = e.target.id
    changedState[field] = e.target.value;
    this.setState(changedState)
  }

  signInOnSubmit (e) {
    e.preventDefault();
    let username = this.state.username
    let password = this.state.password
    this.props.signIn(username, password)
  }

  render () {
    let username = this.state.username
    let password = this.state.password
    let signInValidationStatus = this.props.signInValidationStatus
    let signInTextFieldOnChange = this.signInTextFieldOnChange
    return (
      <div id="sign-in-page">
        <div>
          Sign In | Create Account<br></br>
        </div>
        <div>
          Enter your username to get started.
        </div>
        <div>
          <form id="sign-in-form" onSubmit={this.signInOnSubmit}>
            <div>
              <label>
                Username
                <input id="username" type="text" onChange={signInTextFieldOnChange} value={username}></input>
              </label>
            </div>
            <div>
              <label>
                Password
                <input id="password" type="password" onChange={signInTextFieldOnChange} value={password} ></input>
              </label>
              {signInValidationStatus}
            </div>
            <div>
              <input type="submit" value="Next"></input>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SignIn;