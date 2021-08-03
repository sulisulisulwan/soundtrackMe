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

const getFilm = (id) => {
  return new Promise ((resolve,reject) => {
    Film.findById(id, (err, film) => {
      err ? reject(err) : resolve(film)
    });
  })
}

const getAllScores = (username) => {
  return new Promise ((resolve,reject) => {
    if (username === undefined) {
      Score.find((err, scores) => {
        err ? reject(err) : resolve(scores);
      });
    }
    Score.find({username: username}, (err, scores) => {
      err ? reject(err) : resolve(scores);
    });
  })
}


module.exports = {
  getAllFilms: getAllFilms,
  getFilm: getFilm,
  getAllScores: getAllScores
}