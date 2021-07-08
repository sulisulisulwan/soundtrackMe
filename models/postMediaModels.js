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

const postScore = ({username, scoreTitle, scoreDescription, scoreLink, filmId, filmmaker, filmTitle, filmDescription, filmLink}) => {
  return new Promise ((resolve, reject) => {
    let newScore = new Score({
      username: username,
      scoreTitle: scoreTitle,
      scoreDescription: scoreDescription,
      scoreLink: scoreLink,
      filmId: filmId,
      filmmaker: filmmaker,
      filmTitle: filmTitle,
      filmDescription: filmDescription,
      filmLink: filmLink
    })
    newScore.save((err, result) => {
      err ? reject(err) : resolve(result);
    })
  })
}

module.exports = {
  postFilm: postFilm,
  postScore: postScore
}