import React from 'react';
import axios from 'axios';

const PasswordReset = () => {

  const [passwordsMatch, setPasswordsMatch] = React.useState(true)
  const [passwordReset, setPasswordReset] = React.useState(false);
  const onSubmitHandler = async(e) => {
    e.preventDefault();
    let password = e.target[0].value;
    let confirmPassword = e.target[1].value;
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return
    }
    let currentUrl = window.location.href;
    let username = ''
    for (let i = currentUrl.length - 1; i >= 0; i--) {
      if (currentUrl[i] === '/') {
        break;
      }
      username = currentUrl[i] + username;
    }
    setPasswordsMatch(true)
    try {
      await axios.post('/users/forgot/reset', { username, password })
      setPasswordReset(true);
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <>
      { !passwordReset ?
        <>
          <form onSubmit={onSubmitHandler}>
            <label>
                Type new password:
              <input type="password"></input>
            </label>
            <label>
                Retype new password:
              <input type="password"></input>
            </label>
            <input type="submit" value="Reset Password"></input>
          </form>
          <p>
            {passwordsMatch ? null : 'Passwords do not match'}
          </p>
        </>
      :
        <>
          <p>
            Password successfully reset.  <a href="/">Return to SoundtrackMeē</a>
          </p>
        </>
      }

    </>
  )
}

export default PasswordReset;