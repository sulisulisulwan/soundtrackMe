import React from 'react';

import PasswordForm from './PasswordForm.jsx'
import pwOptions from './password-forms-options.js'


const App = () => {

  return (
    <>
      <h1>Create New User</h1>
      <PasswordForm options={pwOptions.createUser}/>
      <h1>Existing Users Sign In</h1>
      <PasswordForm options={pwOptions.signInUser}/>
      <h1>Forgot Password</h1>
      <PasswordForm options={pwOptions.forgotUserPW}/>
    </>
  )
}

export default App;