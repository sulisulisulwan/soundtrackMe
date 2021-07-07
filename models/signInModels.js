const mongoose = require('mongoose');
const db = require('../db/db.js')

const verifyAccount = (username, password) => {
  return new Promise ((resolve, reject) => {
    db.UserInfo.findOne({
      username: username,
      password: password
    })
    .then(result => {
      let response = result === null ? false : true;
    resolve(response)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const loadProfile = (username) => {
  return new Promise ((resolve, reject) => {
    db.UserInfo.findOne({
      username: username
    })
    .then(userData => {
      let formattedUserData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email,
        signedUpAs: userData.signedUpAs,
      }
      resolve(formattedUserData)
    })
    .catch(err => {
      reject(err)
    });
  });
}

module.exports = {
  verifyAccount: verifyAccount,
  loadProfile: loadProfile
}