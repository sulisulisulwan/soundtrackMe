/* eslint-disable react/prop-types */
import React from 'react';

const SignUpFormConfirmationEmail = ({submitHandler}) => {
  return (
    <div>
      <div>You have successfully created an account!  Within a minute or so, you will receive a confirmation email within the next minute or so.  Welcome to Soundtrack Me!</div>
      <div>Return to the home page <span id="changeToSignedIn" onClick={submitHandler}>here</span>.</div>
    </div>
  )
}



export default SignUpFormConfirmationEmail;