import React from 'react';
import axios from 'axios';
import Header from './header/Header.jsx'
import Body from './body/Body.jsx'




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
      // pageState: 'changeToSignedOut',
      pageState: 'changeToSignedIn',
      failedSignInValidationStatus: '',
      userData: {
        username: 'sulisulisulwan',
        signedUpAs: 'composer'
      }
    }
    this.changePageState = this.changePageState.bind(this);
    this.checkIfUsernameAlreadyExists = this.checkIfUsernameAlreadyExists.bind(this);
    this.checkIfEmailAlreadyExists = this.checkIfEmailAlreadyExists.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
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
      return axios.get(`/signIn/loadProfile?username=${username}`)
    })
    .then(userData => {
      this.setState({userData: userData.data})
      this.changePageState('changeToSignedIn');
    })
    .catch(err => {
      if (err.toString() === 'Error: Request failed with status code 401' || "Error: Request failed with status code 500") {
        let validationStatus = err.toString() === 'Error: Request failed with status code 401' ? 'Username and password did not match' : 'Oops!  Something went wrong on our end!  Try again.';
        this.setState({
          failedSignInValidationStatus: validationStatus
        })
      } else {
        console.error(new Error(err))
      }
    })

  }
  signOut (e) {
    this.changePageState('changeToSignedOut')
    this.setState({
      userData: {}
    })
  }

  render () {
    let pageState = this.state.pageState;
    let failedSignInValidationStatus = this.state.failedSignInValidationStatus;
    let changePageState = this.changePageState;
    let checkIfUsernameAlreadyExists = this.checkIfUsernameAlreadyExists;
    let checkIfEmailAlreadyExists = this.checkIfEmailAlreadyExists;
    let signIn = this.signIn;
    let signOut = this.signOut;
    let userData =this.state.userData;

    if (this.state.pageState === 'changeToSignedIn') {
      return (
        <div>
          <Header
            pageState={pageState}
            userData={userData}
            changePageState={changePageState}
            signOut={signOut}
          />
          <Body
            pageState={pageState}
            userData={userData}
            changePageState={changePageState}
          />
        </div>
      )
    }

    return (
      <div>
        <Header changePageState={changePageState} pageState={this.state.pageState}/>
        <Body
          pageState={pageState}
          failedSignInValidationStatus={failedSignInValidationStatus}
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