import React from 'react';
import axios from 'axios';

const App = () => {

  const handleCreateOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/users', {
        username: e.target[0].value,
        password: e.target[1].value,
        email: e.target[2].value
      })
      console.log('created');
    } catch(err) {
      console.log(err);
    }
  }

  const handleSignInOnSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post('/users/verify', {
        username: e.target[0].value,
        password: e.target[1].value
      })
      console.log(result);
    } catch(err) {
      console.log(err);
    }
  }

  const handleForgotPwOnSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post('/users/forgot', {
        username: e.target[0].value,
        email: e.target[1].value
      })
      console.log(result)
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <>
      <h1>Create New User</h1>
      <form onSubmit={handleCreateOnSubmit}>
        <label>
          Username:
          <input type="text"></input>
        </label>
        <label>
          Password:
          <input type="text"></input>
        </label>
        <label>
          Email:
          <input type="text"></input>
        </label>
        <input type="submit"></input>
      </form>
      <h1>Existing Users Sign In</h1>
      <form onSubmit={handleSignInOnSubmit}>
        <label>
          Username:
          <input type="text"></input>
        </label>
        <label>
          Password:
          <input type="text"></input>
        </label>
        <input type="submit"></input>
      </form>
      <h1>Forgot Password</h1>
      <form onSubmit={handleForgotPwOnSubmit}>
        <label>
          Username:
          <input type="text"></input>
        </label>
        <label>
          Email:
          <input type="text"></input>
        </label>
        <input type="submit"></input>
      </form>
    </>
  )
}

export default App;