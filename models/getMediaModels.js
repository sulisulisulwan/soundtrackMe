const {Film, Score} = require('./../db/db.js')

const getAllFilms = (username) => {
  return new Promise ((resolve,reject) => {
    Film.find({username: username}, (err, films) => {
      console.log(films)
      err ? reject(err) : resolve(films);
    })
  })
}

const getAllScores = (username) => {
  return new Promise ((resolve,reject) => {

  })
}


module.exports = {
  getAllFilms: getAllFilms,
  getAllScores: getAllScores
}