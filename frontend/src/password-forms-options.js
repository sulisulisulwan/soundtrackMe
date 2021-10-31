import axios from 'axios';

const createUser = {
  form: {
    className: 'create-user',
    onSubmitHandler: async (e, setUser) => {
      e.preventDefault();
      let username = e.target[0].value
      let password = e.target[1].value
      let email = e.target[2].value
      try {
        await axios.post('/users/create', {
          username: e.target[0].value,
          password: e.target[1].value,
          email: e.target[2].value
        })
        await axios.get('/users/created', { params: { username, email } })
        console.log('user created');
      } catch(err) {
        console.error(err);
      }
    }
  },
  inputFields: [
    {
      key: 'create-user-username',
      id: 'create-user-username',
      label: 'Username: ',
      type: 'text',
      placeholder: 'username',
      disabled: false,
    },
    {
      key: 'create-user-password',
      id: 'create-user-password',
      label: 'Password: ',
      type: 'password',
      placeholder: '',
      disabled: false,
    },
    {
      key: 'create-user-email',
      id: 'create-user-email',
      label: 'Email: ',
      type: 'email',
      placeholder: 'email@email.com',
      disabled: false,
    }
  ],
  submitButton: {
    value: 'Create User'
  }
}

const signInUser = {
  form: {
    className: 'signin-user',
    onSubmitHandler: async (e, setUser) => {
      e.preventDefault();
      let username = e.target[0].value;
      let password = e.target[1].value;
      try {
        let result = await axios.post('/users/verify', { username, password })
        if (result.data === 'isNotValid') {
          return;
        } else {
          setUser(username)
        }
      } catch(err) {
        console.error(err);
      }
    }
  },
  inputFields: [
    {
      key: 'signin-user-username',
      id: 'signin-user-username',
      label: 'Username: ',
      type: 'text',
      placeholder: 'username',
      disabled: false,
    },
    {
      key: 'signin-user-password',
      id: 'signin-user-password',
      label: 'Password: ',
      type: 'password',
      placeholder: '',
      disabled: false,
    }
  ],
  submitButton: {
    value: 'Sign In'
  }
}

const forgotUserPW = {
  form: {
    className: 'forgot-user-password',
    onSubmitHandler: async (e) => {
      e.preventDefault();
      try {
        let result = await axios.post('/users/reset-password', {
          username: e.target[0].value,
          email: e.target[1].value
        })
      } catch(err) {
        console.error(err);
      }
    }
  },
  inputFields: [
    {
      key: 'reset-password-username',
      id: 'reset-password-username',
      label: 'Username: ',
      type: 'text',
      placeholder: 'username',
      disabled: false,
    },
    {
      key: 'reset-password-email',
      id: 'reset-password-email',
      label: 'Email: ',
      type: 'email',
      placeholder: 'email@email.com',
      disabled: false,
    }
  ],
  submitButton: {
    value: 'Send reset link'
  }
}

export default {
  createUser,
  signInUser,
  forgotUserPW,
}