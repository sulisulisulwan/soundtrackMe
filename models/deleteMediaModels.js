const {Film, Score} = require('./../db/db.js')

const deleteFilm = (id) => {
  return new Promise ((resolve, reject) => {
    Film.findByIdAndDelete(id, (err, result) => {
      console.log('IN PROMISE', result)
      err ? reject(err) : resolve(result);
    })
  })
}

const deleteScore = (id) => {
  return new Promise ((resolve,reject) => {

  })
}


module.exports = {
  deleteFilm: deleteFilm,
  deleteScore: deleteScore
}