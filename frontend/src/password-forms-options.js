import axios from 'axios';

const createUser = {
  form: {
    className: 'create-user',
    onSubmitHandler: async (e) => {
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
    onSubmitHandler: async (e) => {
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
        let result = await axios.post('/users/forgot', {
          username: e.target[0].value,
          email: e.target[1].value
        })
        console.log(result)
      } catch(err) {
        console.error(err);
      }
    }
  },
  inputFields: [
    {
      key: 'forgot-user-username',
      id: 'forgot-user-username',
      label: 'Username: ',
      type: 'text',
      placeholder: 'username',
      disabled: false,
    },
    {
      key: 'forgot-user-email',
      id: 'forgot-user-email',
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