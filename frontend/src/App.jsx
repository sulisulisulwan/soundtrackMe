import React from 'react';
import { useState } from 'react';
import PasswordForm from './PasswordForm.jsx'
import pwOptions from './password-forms-options.js'


const App = () => {

  const [user, setUser] = useState(null)

  const logOutClickHandler = () => {
    setUser(null);
  }

  return (
    <>
      { user ? `Signed in as: ${user}` : null }
      <button onClick={logOutClickHandler} disabled={ user === null }>Logout</button>

      <h1>Create New User</h1>
      <PasswordForm options={pwOptions.createUser} setUser={setUser}/>
      <h1>Existing Users Sign In</h1>
      <PasswordForm options={pwOptions.signInUser} setUser={setUser}/>
      <h1>Forgot Password</h1>
      <PasswordForm options={pwOptions.forgotUserPW}/>
    </>
  )
}

export default App;