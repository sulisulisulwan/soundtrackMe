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
    //query database with username for userData
    //.then(result => {
    if (username === 'sulisulisulwan') {
      resolve(dbResult['1'].userData)
    } else if (username === 'sulimantekalli') {//delete this
      resolve(dbResult['2'].userData);
    }
    //})
    // .catch(err=> {
    //    reject(err)
    //  })
  })
}

module.exports = {
  verifyAccount: verifyAccount,
  loadProfile: loadProfile
}