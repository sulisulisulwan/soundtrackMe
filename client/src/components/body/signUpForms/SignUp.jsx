/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import SignUpForm1 from './SignUpForm1.jsx'
import SignUpForm2 from './SignUpForm2.jsx'
import SignUpForm3 from './SignUpForm3.jsx'
import SignUpFormConfirmationEmail from './SignUpFormConfirmationEmail.jsx'


class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      signedUpAs: '',
      cardType: '',
      cardName: '',
      cardNumber: '',
      cardExpMonth: '',
      cardExpYear: '',
      cardCVV: '',
      verifySignUpForm1Result: ''
    }
    this.textInputHandler = this.textInputHandler.bind(this);
    this.radioInputHandler = this.radioInputHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.updateCardType = this.updateCardType.bind(this);
    this.verifyUserInputForm1 = this.verifyUserInputForm1.bind(this);
    this.createNewUserInDB = this.createNewUserInDB.bind(this);
  }
  updateCardType (newCardType) {
    this.setState({
      cardType: newCardType
    })
  }

  textInputHandler (e) {
    console.log(e.target.id)
    let newState = {}
    newState[e.target.id] = e.target.value;
    this.setState(newState)
  }
  radioInputHandler (e) {
    this.setState({
      signedUpAs: e.target.value
    })
  }

  verifyUserInputForm1 () {
    return new Promise((resolve, reject) => {
      let usernameExists = this.props.checkIfUsernameAlreadyExists(this.state.username)
      let emailExists = this.props.checkIfEmailAlreadyExists(this.state.email)
      return Promise.all([usernameExists, emailExists])
      .then(results => {

        [usernameExists, emailExists] = results;
        if (usernameExists.data || emailExists.data) {
          console.log(usernameExists.data, emailExists.data)
          usernameExists = usernameExists.data ? 'Username already exists' : '';
          emailExists = emailExists.data ? 'Email already exists' : '';
          results = [usernameExists, emailExists]
          resolve(results)
        } else {
          resolve('changeToSignUpForm2')
        }
      })
      .catch(err => {
        console.error(err)
        reject(new Error(err))
      })
    })
  }

  submitHandler (e) {
    e.preventDefault();
    let changeTo = e.target.id
    let changePageState = this.props.changePageState;
    let createNewUserInDB = this.createNewUserInDB;
    let signIn = this.props.signIn;
    if (changeTo === 'changeToSignUpForm1') {
      changePageState(changeTo);
      return;
    } else if (changeTo === 'changeToSignUpForm2') {
      this.verifyUserInputForm1()
      .then(result => {
        if (Array.isArray(result)) {
          //email or username already exists
          this.setState({verifySignUpForm1Result: result});
          return;
        } else {
          this.setState({
            cardType: '',
            cardName: '',
            cardNumber: '',
            cardExpMonth: '',
            cardExpYear: '',
            cardCVV: '',
            verifySignUpForm1Result: ['', '']
        });
          changePageState(changeTo);
          return
        }
      })
      .catch(err => {
        console.error(new Error(err))
      })
    } else if (changeTo === 'changeToSignUpForm3') {
      changePageState(changeTo)
    } else if (changeTo === 'changeToSignUpConfirmationEmail') {
      let userInfo = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        signedUpAs: this.state.signedUpAs,
        cardType: this.state.cardType,
        cardName: this.state.cardName,
        cardNumber: this.state.cardNumber,
        cardExpMonth: this.state.cardExpMonth,
        cardExpYear: this.state.cardExpYear,
        cardCVV: this.state.cardCVV
      }
      createNewUserInDB(userInfo)
      .then(result => {
        console.log(result)
        signIn(this.state.username, this.state.password);
        changePageState(changeTo)
      })
      .catch(err => {
        console.log(new Error(err))
      })
    }
  }

  createNewUserInDB (userInfo) {
    return new Promise ((resolve, reject) => {
      axios.post('/createNewUser', {userInfo: userInfo})
      .then(_=> {
        resolve('new user created')
      })
      .catch(err=> {
        reject(err)
      })
    })
  }



  render () {
    let pageState = this.props.pageState;
    let mainContents = <div></div>;

    if (pageState === 'changeToSignUpForm1') {
      mainContents = <SignUpForm1
        textInputHandler={this.textInputHandler}
        radioInputHandler={this.radioInputHandler}
        submitHandler={this.submitHandler}
        fields={this.state}
      />
    } else if (pageState === 'changeToSignUpForm2') {
      mainContents = <SignUpForm2
        textInputHandler={this.textInputHandler}
        submitHandler={this.submitHandler}
        updateCardType={this.updateCardType}
        fields={this.state}
      />
    } else if (pageState === 'changeToSignUpForm3') {
      mainContents = <SignUpForm3
        formValues={this.state}
        submitHandler={this.submitHandler}
      />
    } else if (pageState === 'changeToSignUpConfirmationEmail') {
      mainContents = <SignUpFormConfirmationEmail
        submitHandler={this.submitHandler}
        createNewUserInDB={this.createNewUserInDB}
        />
    }
    return (
      <div id="sign-up">
        {mainContents}
      </div>
    )
  }

}

export default SignUp;