/* eslint-disable react/prop-types */
import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.signInTextFieldOnChange = this.signInTextFieldOnChange.bind(this);
  }
  signInTextFieldOnChange (e) {
    let changedState = {}
    let field = e.target.id
    changedState[field] = e.target.value;
    this.setState({changedState})
  }


  render () {
    let username = this.state.username
    let password = this.state.password
    let signIn = this.props.signIn;
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
          <form id="sign-in-form" onSubmit={signIn}>
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