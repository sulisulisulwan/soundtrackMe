const {Film, Score} = require('../db/db.js')

const postFilm = ({username, filmTitle, filmDescription, filmLink}) => {
  return new Promise ((resolve, reject) => {
    let newFilm = new Film({
      username: username,
      filmTitle: filmTitle,
      filmDescription: filmDescription,
      filmLink: filmLink,
    })
    newFilm.save((err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const postScore = (music) => {
  return new Promise ((resolve, reject) => {
    //TODO:
    music = 'goes into a query!'
    music ? resolve() : reject() //change this of course
  })

}

module.exports = {
  postFilm: postFilm,
  postScore: postScore
}