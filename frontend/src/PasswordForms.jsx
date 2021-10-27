import React from 'react';

const PasswordForms = ({ options }) => {

  /**

   options = {
     form: {
       className: 'user-signin'
     }
     inputFields: [
       {
         key: 'user-signin-input',
         type: 'text',
         value: '',
         default: 'username',
         disabled: 'false',
       }, ...
     ],
     submitButton: {
       value: 'Sign In'
     }

   }

   */

  return(
    <form className={ options.form.className } onSubmit={ options.onSubmitHandler }>
      {options.inputFields.map((input, i)=>
        <input
          key={ `${input.key}-${i}` }
          type={ input.type }
          value={ input.value }
          default={ input.default }
          disabled={ input.disabled }>
        </input>)}
      <input type="onSubmit" value={ options.submitButton.value }></input>
    </form>
  )

}