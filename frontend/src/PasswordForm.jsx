import React from 'react';

const PasswordForm = ({ options }) => {

  return(
    <form className={ options.form.className } onSubmit={ options.form.onSubmitHandler }>
      {options.inputFields.map((input, i) => <InputField  key={ `${input.key}-${i}` } options={ input }/>)
      }
      <input type="submit" value={ options.submitButton.value }></input>
    </form>
  )

}

const InputField = ({ options }) => {
  return (
    <label>
      {options.label}
      <input
        type={ options.type }
        placeholder={ options.placeholder }
        disabled={ options.disabled }
        >
      </input>
    </label>
  )
}

export default PasswordForm;