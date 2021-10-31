const db = require('../db/db');

const create = async(username, email, salt, hash)  => {
  try {
    return await db.query(`INSERT INTO Users SET ?`, { username, email, salt, hash })
  } catch (err) {
    return Promise.reject(err)
  }
}

const getUsernameExists = async(username) => {
  try {
    let result = await db.query(`SELECT * FROM users WHERE username = '${username}'`);
    return !!result[0][0];
  } catch(err) {
    console.error(err);
    return Promise.reject(err)

  }
}

const getUsernameByEmail = async(email) => {
  try {
    let result = await db.query(`SELECT username FROM users WHERE email = '${email}'`);
    return result[0][0];
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

const get = async(username) => {
  try {
    let result = await db.query(`SELECT * FROM Users WHERE username = '${username}'  AND confirmed = true`)
    return result[0][0];
  } catch(err) {
    console.error(err);
    return Promise.reject(err)
  }
}

const getUsernameByEmailIfConfirmed = async(email) => {
  try {
    let result = await db.query(`SELECT username FROM Users WHERE email = '${email}' AND confirmed = true`);
    return result[0].length ? result[0][0].username : null;
  } catch(err) {
    console.error(err);
    return Promise.reject(err)
  }
}

const getResetSaltAndHash = async(username) => {
  try {
    let result = await db.query(`SELECT resetToken FROM Users WHERE username = '${username}'`)
    return result[0][0];
  } catch(err) {
    console.error(err);
    return Promise.reject(err)
  }
}

const updateResetSaltAndHash = async(username, resetSalt, resetToken) => {
  let v = { resetSalt, resetToken };
  try {
    await db.query(`UPDATE Users SET ? WHERE username = '${username}'`, v)
    return;
  } catch (err) {
    console.error(err);
    return Promise.reject(err)
  }
}

const updateSaltAndHash = async(username, salt, hash) => {
  let v = { salt, hash };
  try {
    await db.query(`UPDATE Users SET ? WHERE username = '${username}'`, v)
    return;
  } catch(err) {
    return Promise.reject(err)
  }
}



const updateUserConfirmation = async(username) => {
  try {
    let result = await db.query(`UPDATE Users SET confirmed = true WHERE username = '${username}'`)
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  create,
  get,
  getUsernameExists,
  getUsernameByEmail,
  getUsernameByEmailIfConfirmed,
  getResetSaltAndHash,
  updateSaltAndHash,
  updateResetSaltAndHash,
  updateUserConfirmation
}