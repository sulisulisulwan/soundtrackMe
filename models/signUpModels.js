const mongoose = require('mongoose');
const db = require('../db/db.js')

const checkUserNameExists = (username) => {
  return new Promise ((resolve, reject) => {
    //TODO:
    db.UserInfo.findOne({username: username})
      .then(result => {
        console.log('this doesnt exist', result);
      })

    let response = false
    username ? resolve(response) : reject() //change this of course
  })
}

const checkEmailExists = (email) => {
  return new Promise ((resolve, reject) => {
    //TODO:

    let response = false
    email ? resolve(response) : reject() //change this of course
  })

}

const createNewUser = (userInfo) => {
  return new Promise ((resolve, reject) => {

    let newUserInfo = new db.UserInfo({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      username: userInfo.username,
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