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

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = {
  UserInfo: UserInfo
}