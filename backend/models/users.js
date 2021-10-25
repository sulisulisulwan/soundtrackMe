const db = require('../db/db');

const create = async(username, email, salt, hash)  => {
  try {
    return db.query(`INSERT INTO Users SET ?`, { username, email, salt, hash })
  } catch (err) {
    console.error(err)
  }
}

const get = async(username) => {
  try {
    let result = await db.query(`SELECT * FROM Users WHERE username = '${username}'`)
    return result[0][0];
  } catch(err) {
    console.error(err);
  }
}

const updateSaltAndHash = async(username, salt, hash) => {
  let v = { salt, hash };
  try {
    await db.query(`UPDATE Users SET ? WHERE username = '${username}'`, v)
    return;
  } catch(err) {
    console.error(err);
  }
}

const getUsernameByEmail = async(email) => {
  try {
    let result = await db.query(`SELECT username FROM Users WHERE email = '${email}'`)
    return result[0][0].username;
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  create,
  get,
  getUsernameByEmail,
  updateSaltAndHash
}