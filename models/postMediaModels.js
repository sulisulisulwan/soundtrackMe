const {Film, Score} = require('../db/db.js')

const postFilmInfo = ({username, filmTitle, filmDescription, filmLink}) => {
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

const updateFilmWithNewScore = (filmId, scoreId) => {
  return new Promise ((resolve, reject) => {
    Film.update(
      { _id: filmId },
      { $push: { filmScores: scoreId } },
       (err, result) => {
       err ? reject(err) : resolve(result);
     });
  })
}

const postScoreInfo = ({username, scoreTitle, scoreDescription, filmId, filmmaker, filmTitle, filmDescription, filmLink, email}) => {
  return new Promise ((resolve, reject) => {
    let newScore = new Score({
      username: username,
      email: email,
      scoreTitle: scoreTitle,
      scoreDescription: scoreDescription,
      filmId: filmId,
      filmmaker: filmmaker,
      filmTitle: filmTitle,
      filmDescription: filmDescription,
    })
    newScore.save((err, result) => {
      if (err) {
        reject(err)
      } else {
        let scoreInfo = {
          scoreId: result._id,
          email: result.email,
          username: username,
          scoreTitle: scoreTitle,
          scoreDescription: scoreDescription,
        }
        Promise.all([result, updateFilmWithNewScore(filmId, scoreInfo)])
        .then(allData => {
          console.log(allData[1])
          resolve(allData[0]);
        })
        .catch(err => {
          reject(err)
        })
      }
    })
  })
}

module.exports = {
  postFilmInfo: postFilmInfo,
  postScoreInfo: postScoreInfo
}