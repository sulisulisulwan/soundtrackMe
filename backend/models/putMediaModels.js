const {Score, Film} = require('../db/db.js')

const putFavoriteOnScore = (scoreId) => {
  return new Promise((resolve, reject) => {
    Score.findByIdAndUpdate(scoreId, {isFavorite: true}, (err, result) => {
      err ? reject(err) : resolve(result);
    })
  })
}

// const putUpdateOnScoresOfFilm = (username, myFilms) => {
//   return new Promise((resolve, reject) => {
//     Score.findOneAndUpdate(username, {myFilms: myFilms}, (err, result) => {
//       err ? reject(err) : resolve(result);
//     })
//   })
// }



module.exports = {
  putFavoriteOnScore: putFavoriteOnScore
  // putUpdateOnMyFilms: putUpdateOnMyFilms
}