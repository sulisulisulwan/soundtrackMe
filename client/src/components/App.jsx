import React from 'react';
import Header from './header/Header.jsx'
import Body from './body/Body.jsx'
import axios from 'axios';

let pageStates = {
  changeToSignedOut: 'changeToSignedOut',
  changeToSignedIn: 'changeToSignedIn',
  changeToSignUpForm1: 'changeToSignUpForm1',
  changeToSignUpForm2: 'changeToSignUpForm2',
  changeToSignUpForm3: 'changeToSignUpForm3',
  changeToSignUpConfirmationEmail: 'changeToSignUpConfirmationEmail',
  changeToSignIn: 'changeToSignIn',
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      pageState: 'changeToSignedOut',
      signInValidationStatus: '',
      userData: {}
    }
    this.changePageState = this.changePageState.bind(this);
    this.checkIfUsernameAlreadyExists = this.checkIfUsernameAlreadyExists.bind(this);
    this.checkIfEmailAlreadyExists = this.checkIfEmailAlreadyExists.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  changePageState (changeTo) {
    let pageState = changeTo
    this.setState({
      pageState: pageStates[pageState]
    });
  }
  checkIfUsernameAlreadyExists (username) {
    return axios.get(`/checkUserNameExists?username=${username}`)
  }
  checkIfEmailAlreadyExists (email) {
    return axios.get(`/checkEmailExists?email=${email}`)
  }

  signIn(username, password) {
    axios.post(`/signIn/verifyAccount`, {
      username: username,
      password: password
    })
    .then(result => {
      let status = result.status
      if (status === 401 || status === 500) {

        return status;
      } else {
        return axios.get(`/signIn/loadProfile?${username}`)
      }
    })
    .then(userData => {
      this.setState({userData: userData})
      this.changePageState('changeToSignedIn');
    })
    .catch(err => {
      console.log('MADE IT HERE')
      if (err === 401 || err === 500) {
        let validationStatus = err === 401 ? 'Username and password did not match' : 'Oops!  Something went wrong on our end!  Try again.';
        this.setState({
          signInValidationStatus: validationStatus
        })
      } else {
        console.error(new Error(err))
      }
    })
  }

  render () {
    let pageState = this.state.pageState;
    let signInValidationStatus = this.state.signInValidationStatus;
    let changePageState = this.changePageState;
    let checkIfUsernameAlreadyExists = this.checkIfUsernameAlreadyExists;
    let checkIfEmailAlreadyExists = this.checkIfEmailAlreadyExists;
    let signIn = this.signIn;

    if (this.state.pageState === 'changeToSignedIn') {
      return (
        <div>
          <Header changePageState={this.changePageState} pageState={this.state.pageState}/>
          signed in
        </div>
      )
    }

    return (
      <div>
        <Header changePageState={changePageState} pageState={this.state.pageState}/>
        <Body
          pageState={pageState}
          signInValidationStatus={signInValidationStatus}
          changePageState={changePageState}
          checkIfUsernameAlreadyExists={checkIfUsernameAlreadyExists}
          checkIfEmailAlreadyExists={checkIfEmailAlreadyExists}
          signIn={signIn}
        />
      </div>

    )
  }
}




export default App