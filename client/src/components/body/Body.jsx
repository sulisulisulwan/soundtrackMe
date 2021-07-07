/* eslint-disable react/prop-types */
import React from 'react';
import SignIn from './SignIn.jsx';
import SignedInView from './signedIn/SignedInView.jsx';
import SignUp from './signUpForms/SignUp.jsx';
const Body = ({changePageState, pageState, checkIfUsernameAlreadyExists, checkIfEmailAlreadyExists, signIn, failedSignInValidationStatus, userData}) => {
  if (pageState === 'changeToSignIn') {
    return (
      <main>
        <SignIn
          pageState={pageState}
          changePageState={changePageState}
          failedSignInValidationStatus={failedSignInValidationStatus}
          checkIfUsernameAlreadyExists={checkIfUsernameAlreadyExists}
          checkIfEmailAlreadyExists={checkIfEmailAlreadyExists}
          signIn={signIn}
        />
      </main>
    )

  } else if (pageState === 'changeToSignedIn') {
    return (
      <main>
        <SignedInView userData={userData}/>
      </main>
    )
  }
  return (
    <main>
      <SignUp
        pageState={pageState}
        changePageState={changePageState}
        checkIfUsernameAlreadyExists={checkIfUsernameAlreadyExists}
        checkIfEmailAlreadyExists={checkIfEmailAlreadyExists}
        signIn={signIn}
      />
    </main>
  )
}

export default Body;