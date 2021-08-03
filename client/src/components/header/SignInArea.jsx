/* eslint-disable react/prop-types */
import React from 'react';


class SignInArea extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalIsOpen: false
    }
    this.toggleSignInModal = this.toggleSignInModal.bind(this);
    this.signInOrUpClickHandler = this.signInOrUpClickHandler.bind(this);
  }
  toggleSignInModal (e) {
    if (e._reactName === 'onMouseLeave') {
      this.setState({
        modalIsOpen: false
      })
      return;
    }
    if (e.target.id === 'sign-in-button') {
      this.setState({
        modalIsOpen: true
      })
    }
  }

  signInOrUpClickHandler (e) {
    this.props.changePageState(e.target.id)
  }
  render () {
    let pageState = this.props.pageState
    if (pageState === 'changeToSignedIn') {
      let signOut = this.props.signOut;
      return (
        <div id="sign-out-block" onMouseLeave={this.toggleSignInModal}>
          <span id="sign-out-button" onClick={signOut}>Sign Out</span>

        </div>
      )
    }
    return (
      <div id="sign-in-block" onMouseLeave={this.toggleSignInModal}>
        <span id="sign-in-button" onMouseEnter={this.toggleSignInModal}>Sign In</span>
          <SignInModal modalIsOpen={this.state.modalIsOpen} signInOrUpClickHandler={this.signInOrUpClickHandler}/>
      </div>
    )
  }
}


const SignInModal = ({modalIsOpen, signInOrUpClickHandler}) => {
  let openModal = (
      <div id="sign-in-modal">
        <div>
          <button id="changeToSignIn" onClick={signInOrUpClickHandler}>Sign In</button>
        </div>
        <div>
          <button id="changeToSignUpForm1" onClick={signInOrUpClickHandler}>Create Account</button>
        </div>
      </div>
  )

  return modalIsOpen ? openModal : null
}

export default SignInArea;