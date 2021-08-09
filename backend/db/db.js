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

const scoreSchema = new mongoose.Schema({
  username: String,
  email: String,
  scoreTitle: String,
  scoreDescription: String,
  scoreLink: String,
  filmId: String,
  filmmaker: String,
  filmTitle: String,
  filmDescription: String,
  isFavorite: Boolean
})

const filmSchema = new mongoose.Schema({
  username: String,
  filmTitle: String,
  filmDescription: String,
  filmLink: String,
  filmScores: []
})

const UserInfo = mongoose.model('UserInfo', userInfoSchema);
const Film = mongoose.model('Film', filmSchema);
const Score = mongoose.model('Score', scoreSchema);

module.exports = {
  UserInfo: UserInfo,
  Film: Film,
  Score: Score
}
