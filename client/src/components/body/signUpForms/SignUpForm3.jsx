/* eslint-disable react/prop-types */
import React from 'react';

const SignUpForm3 = ( {formValues, submitHandler} ) => {
  let firstName = formValues.firstName
  let lastName = formValues.lastName
  let userName = formValues.userName
  let email = formValues.email
  let signUpAs = formValues.signUpAs
  let cardName = formValues.cardName
  let cardType = formValues.cardType
  let asteriskIndexMax = formValues.cardNumber.length - 4
  let cardNumber = formValues.cardNumber.split('').map((num, i) => i < asteriskIndexMax ? '*' : num);

  return (
    <div id="sign-up-form-email-confirmation">
      Please check your information before submitting:
      <br></br>
      <div id="user-info-wrapper">
        <table id="user-info">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{fontWeight: 'bold'}}>First Name: </td>
              <td>{firstName}</td>
            </tr>
            <tr>
              <td style={{fontWeight: 'bold'}}>Last Name: </td>
              <td>{lastName}</td>
            </tr>
            <tr>
              <td style={{fontWeight: 'bold'}}>Username: </td>
              <td>{userName}</td>
            </tr>
            <tr>
              <td style={{fontWeight: 'bold'}}>Email: </td>
              <td>{email}</td>
            </tr>
            <tr>
              <td style={{fontWeight: 'bold'}}>Signing up as a: </td>
              <td>{signUpAs}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="payment-info-wrapper">
        Payment Information:
        <table id="payment-info">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{fontWeight: 'bold'}}>Name on card: </td>
              <td>{cardName}</td>
            </tr>
            <tr>
              <td style={{fontWeight: 'bold'}}>Card type: </td>
              <td>{cardType}</td>
            </tr>
            <tr>
              <td style={{fontWeight: 'bold'}}>Card number: </td>
              <td>{cardNumber}</td>
            </tr>
          </tbody>
        </table>
        <div id="back-or-submit">
          <button id="changeToSignUpForm2" type="button" onClick={submitHandler}>Back</button>
          <form id="changeToSignUpConfirmationEmail" onSubmit={submitHandler}>
            <input type="submit" value="Create Account"></input>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm3;