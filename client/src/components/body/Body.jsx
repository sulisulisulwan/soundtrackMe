/* eslint-disable react/prop-types */
import React from 'react';
import SignIn from './signInView/SignIn.jsx';
import SignUp from './signUpForms/SignUp.jsx';
import ComposerView from './signedInViews/composerView/ComposerView.jsx'
import FilmmakerView from './signedInViews/filmmakerView/FilmmakerView.jsx'
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
    let signedInView = userData.signedUpAs === 'composer' ? <ComposerView userData={userData}/>
      : <FilmmakerView userData={userData}/>
    return (
      <main>
        {signedInView}
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