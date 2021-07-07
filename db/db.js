const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/soundtrackMe', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!')
})

const userInfoSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  signedUpAs: String,
  portfolio: {},
  cardType: String,
  cardName: String,
  cardNumber: Number,
  cardExpMonth: Number,
  cardExpYear: Number,
  cardCVV: Number,
})

// const composerInfoSchema = new mongoose.Schema({
//   username: String,
//   scores: {},
//   filmsAttempted: {}
// })
const scoreSchema = new mongoose.Schema({
  username: String,
  audioTitle: String,
  audioDescription: String,
  audioLink: String
})

// const filmmakerInfoSchema = new mongoose.Schema({
//   username: String,
//   films: {}
// })
const filmSchema = new mongoose.Schema({
  username: String,
  filmTitle: String,
  filmDescription: String,
  filmLink: String,
})


/*
films: {
  westernFlick: {
    score1: {
      composer: daffyduck
      audio: someFileg
      like: true
    }
    score2: false
    score3: false
    score4: true
  }
}
*/

const UserInfo = mongoose.model('UserInfo', userInfoSchema);
const Film = mongoose.model('Film', filmSchema);
const Score = mongoose.model('Score', scoreSchema);
// const FilmmakerInfo = mongoose.model('FilmmakerInfo', filmmakerInfoSchema);
// const ComposerInfo = mongoose.model('ComposerInfo', composerInfoSchema);

module.exports = {
  UserInfo: UserInfo,
  Film: Film,
  Score: Score
  // FilmmakerInfo: FilmmakerInfo,
  // ComposerInfo: ComposerInfo,
}
