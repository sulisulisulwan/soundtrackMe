/* eslint-disable react/prop-types */
import React from 'react';
import SignUp from './signUpForms/SignUp.jsx'
import SignIn from './signIn.jsx'
const Body = ({changePageState, pageState, checkIfUserNameAlreadyExists, checkIfEmailAlreadyExists, signIn}) => {
  if (pageState === 'changeToSignIn') {
    return (
      <main>
        <SignIn
          pageState={pageState}
          changePageState={changePageState}
          checkIfUserNameAlreadyExists={checkIfUserNameAlreadyExists}
          checkIfEmailAlreadyExists={checkIfEmailAlreadyExists}
          signIn={signIn}
        />
      </main>
    )

  }
  return (
    <main>
      <SignUp
        pageState={pageState}
        changePageState={changePageState}
        checkIfUserNameAlreadyExists={checkIfUserNameAlreadyExists}
        checkIfEmailAlreadyExists={checkIfEmailAlreadyExists}
        signIn={signIn}
      />
    </main>
  )
}

export default Body;