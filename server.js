const express = require('express');
const app = express();
const port = 3000;
const {checkUserNameExists, checkEmailExists, createNewUser} = require('./models/signUpModels.js');
const {postMovie, postMusic} = require('./models/uploadContentModels.js');
const {verifyAccount, loadProfile} = require('./models/signInModels.js')
app.listen(port, () => {
  console.log(`listening on ${port}`)
})

app.use(express.static('client/public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.status(200)
})