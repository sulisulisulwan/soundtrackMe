const mongoose = require('mongoose');
const db = require('../db/db.js')

const checkUserNameExists = (userName) => {
  return new Promise ((resolve, reject) => {
    //TODO:

    let tempDB = {
      sulimantekalli: true,
      suli: true
    }
    let response = tempDB[userName] === undefined ? false : true
    userName ? resolve(response) : reject() //change this of course
  })
}

const checkEmailExists = (email) => {
  return new Promise ((resolve, reject) => {
    //TODO:

    let tempDB = {
      'sulimantekalli@gmail.com': true,
      'suli@gmail.com': true
    }
    let response = tempDB[email] === undefined ? false : true
    email ? resolve(response) : reject() //change this of course
  })

}

const createNewUser = (userInfo) => {
  return new Promise ((resolve, reject) => {

    let newUserInfo = new db.UserInfo({
      firstName: userInfo.firstName,
      lastName: userInfo.lasttName,
      userName: userInfo.userName,
      password: userInfo.password,
      email: userInfo.email,
      signedUpAs: userInfo.signedUpAs,
      cardType: userInfo.cardType,
      cardName: userInfo.cardName,
      cardNumber: userInfo.cardNumber,
      cardExpMonth: userInfo.cardExpMonth,
      cardExpYear: userInfo.cardExpYear,
      cardCVV: userInfo.cardCVV,
    })
    newUserInfo.save((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

module.exports = {
  checkUserNameExists: checkUserNameExists,
  checkEmailExists: checkEmailExists,
  createNewUser: createNewUser
}