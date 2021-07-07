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
  cardType: String,
  cardName: String,
  cardNumber: Number,
  cardExpMonth: Number,
  cardExpYear: Number,
  cardCVV: Number,
})

const composerInfoSchema = new mongoose.Schema({
  username: String,
  portfolio: {
    audioFiles: {},
  },
  filmscores: {}
})

//filmscores will be

const filmmakerInfoSchema = new mongoose.Schema({
  username: String,
  films: {}
})

const allFilmsSchema = new mongoose.Schema({
  films: {}
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

module.exports = {
  UserInfo: UserInfo
}

const AllFilms = mongoose.model('AllFilms', allFilmsSchema)