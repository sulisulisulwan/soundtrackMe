let dbResult = {
  '1': {
    username: 'sulisulisulwan',
    password: 'somekindofhash',
    userData: {
      signedUpAs: 'composer'
    }
  },
  '2': {
    username: 'sulimantekalli',
    password: 'somekindofhash2',
    userData: {
      signedUpAs: 'filmmaker'
    }
  }
}

const verifyAccount = (username, password) => {
  return new Promise ((resolve, reject) => {
    //check database for username
    //query database with username, pull out password
    // .then(result => {
    dbResult.password === password ? resolve(true) : resolve(false);
    // })
    // .catch(err => {
    //   reject(err)
    // })
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