const {Film, Score} = require('./../db/db.js')

const getAllFilms = (username) => {
  return new Promise ((resolve,reject) => {
    if (username === undefined) {
      Film.find((err, films) => {
        err ? reject(err) : resolve(films);
      });
    }
    Film.find({username: username}, (err, films) => {
      err ? reject(err) : resolve(films);
    });
  });
}

const getAllScores = (username) => {
  return new Promise ((resolve,reject) => {

  })
}


module.exports = {
  getAllFilms: getAllFilms,
  getAllScores: getAllScores
}