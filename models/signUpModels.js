const mongoose = require('mongoose');
const db = require('../db/db.js')

const checkUsernameExists = (username) => {
  return new Promise ((resolve, reject) => {
    console.log('username is', username)
    db.UserInfo.findOne({username: username})
    .then(result => {
      let response = result === null ? false : true;
      resolve(response)
    })
    .catch(err => {
      reject(err)
    });
  })
}

const checkEmailExists = (email) => {
  return new Promise ((resolve, reject) => {
    db.UserInfo.findOne({email: email})
    .then(result => {
      let response = result === null ? false : true;
      resolve(response);
    })
    .catch(err => {
      reject(err);
    })
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
  checkUsernameExists: checkUsernameExists,
  checkEmailExists: checkEmailExists,
  createNewUser: createNewUser
}