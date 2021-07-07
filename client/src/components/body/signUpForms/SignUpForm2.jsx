/* eslint-disable react/prop-types */
import React from 'react';

class SignUpForm2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardType: 'invalid',
      validCardNumberLength: 16,
      validCVVLength: 3,
      isValidEntry: false
    }
  }

  componentDidUpdate () {
    let updateCardType = this.props.updateCardType
    let currentCardType = this.state.cardType;
    let validCVVLength = this.state.validCVVLength;
    let validCardNumberLength = this.state.validCardNumberLength;
    let fields = this.props.fields;
    let isValidEntry = this.state.isValidEntry

    if (fields.cardType !== currentCardType) {
      updateCardType(currentCardType);
    }

    if (isValidEntry) {
      if (fields.cardName.length === 0 || (parseInt(fields.cardNumber)).toString().length !== validCardNumberLength || (parseInt(fields.cardCVV)).toString().length !== validCVVLength) {
        this.setState ({
          isValidEntry: false
        })
      }
    }

    if (!isValidEntry) {
      let cardTypeShouldBe = fields.cardNumber[0] !== '3' && fields.cardNumber[0] !== '4' && fields.cardNumber[0] !== '5' && fields.cardNumber[0] !== '6' ? 'invalid'
          : fields.cardNumber[0] === '3' ? 'Amex'
          : fields.cardNumber[0] === '4' ? 'Visa'
          : fields.cardNumber[0] === '5' ? 'Mastercard'
          : 'Discover'
      let cardLengthShouldBeThisLong = cardTypeShouldBe === 'Amex' ? 15 : 16
      let cvvShouldBeThisLong = cardTypeShouldBe === 'Amex' ? 4 : 3;

      if (currentCardType !== cardTypeShouldBe) {
        this.setState({
          cardType: cardTypeShouldBe,
          validCardNumberLength: cardLengthShouldBeThisLong,
          validCVVLength: cvvShouldBeThisLong
        })
      }

      if (currentCardType !== 'invalid') {
        if (!isValidEntry) {

            cardExpYear: ''
          if (fields.cardName.length !== 0 && (parseInt(fields.cardNumber)).toString().length === validCardNumberLength && (parseInt(fields.cardCVV)).toString().length === validCVVLength && parseInt(fields.cardCVV).toString() !== 'NaN' && fields.cardExpMonth !== '' && fields.cardExpYear !== '') {
            this.setState({isValidEntry: true})
          }
        }
      }
    }
  }



  render () {

    let fields = this.props.fields;
    let fieldInputHandler = this.props.textInputHandler;
    let submitHandler = this.props.submitHandler;
    let currentCardType = this.state.cardType === 'invalid' ? '' : this.state.cardType;
    let validCVVLength = this.state.validCVVLength;
    let isValidEntry = this.state.isValidEntry ? 'VALID!' : ''
    let isDisabled = isValidEntry === 'VALID!' ? false : true

    return (
      <form id="changeToSignUpForm3" onSubmit={submitHandler}>
        <div>
          <label>
            Name on Credit Card
            <input id="cardName" type="text" onChange={fieldInputHandler} value={fields.cardName} required></input>
          </label>
        </div>
        {currentCardType}
        <div>
          <label>
            Credit Card Number
            <input id="cardNumber" type="text" minLength={this.validCardNumberLength} maxLength={this.validCardNumberLength} onChange={fieldInputHandler} value={fields.cardNumber} required></input>
          </label>
        </div>
        <div>
        Expiration Date:
          <label>
            Month
            <select defaultValue="DEFAULT" name="cardExpMonth" id="cardExpMonth" onChange={fieldInputHandler} required>
              <option value="DEFAULT" disabled>Month</option>
              <option value="1">1 Jan</option>
              <option value="2">2 Feb</option>
              <option value="3">3 Mar</option>
              <option value="4">4 Apr</option>
              <option value="5">5 May</option>
              <option value="6">6 Jun</option>
              <option value="7">7 Jul</option>
              <option value="8">8 Aug</option>
              <option value="9">9 Sep</option>
              <option value="10">10 Oct</option>
              <option value="11">11 Nov</option>
              <option value="12">12 Dec</option>
            </select>
            Year
            <select defaultValue="DEFAULT" name="cardExpYear" id="cardExpYear" onChange={fieldInputHandler} required>
              <option value="DEFAULT" disabled>Year</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
              <option value="2032">2032</option>
            </select>
          </label>
          <label>
            CVV
            {`${validCVVLength} digits`}
            <input id="cardCVV" type="text" minLength={this.state.validCVVLength} maxLength={this.state.validCVVLength} onChange={fieldInputHandler} value={fields.cardCVV} required></input>
          </label>
        </div>
        {isValidEntry}
        <div>
          <button id="changeToSignUpForm1" type="button" onClick={submitHandler}>Back</button>
          <input type="submit" value="Next" disabled={isDisabled}></input>
        </div>
      </form>
    )
  }
}

export default SignUpForm2;