/* eslint-disable no-unused-vars */
const express = require('express');
const app = express();
const port = 1337;
const {checkUsernameExists, checkEmailExists, createNewUser} = require('./models/signUpModels.js');
const {postMovie, postMusic} = require('./models/uploadContentModels.js');
const {verifyAccount, loadProfile} = require('./models/signInModels.js')
app.listen(port, () => {
  console.log(`listening on ${port}`)
})

app.use(express.static('client/public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.sendStatus(200)
})

/*********************************************
 *
 *                    ROUTES
 *
 *********************************************/

app.get('/checkUserNameExists', (req, res) => {
  let username = req.query.username
  checkUsernameExists(username)
  .then(result=> {
    res.status(200).json(result)
  })
  .catch(err => {
    console.error(new Error(err))
    res.sendStatus(500);
  })
})

app.get('/checkEmailExists', (req, res) => {
  let email = req.query.email
  checkEmailExists(email)
  .then(result=> {
    res.status(200).json(result)
  })
  .catch(err => {
    console.error(new Error(err))
    res.sendStatus(500);
  })
})

app.post('/createNewUser', (req, res) => {
  let userInfo = req.body.userInfo;
  createNewUser(userInfo)
  .then(_=> {
    res.sendStatus(201)
  })
  .catch(err => {
    console.error(new Error(err))
    res.sendStatus(500);
  })
})


//SIGN IN AND LOAD PROFILE Route

app.post('/signIn/verifyAccount', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  console.log('THIS FIRES')
  verifyAccount(username, password)
  .then(result => {
    console.log(result)
    result ? res.sendStatus(200) : res.sendStatus(401);
  })
  .catch(err => {
    console.log(new Error(err));
    res.sendStatus(500)
  })
})

app.get('/signIn/loadProfile', (req, res) => {
  let username = req.query.username
  loadProfile(username)
  .then(userData => {
    res.status(200).json(userData);
  })
  .catch(err => {
    console.log(new Error(err));
    res.statsendStatusus(500);
  })
})








//Upload Content Routes

app.post('./postMovie', (req, res) => {
  //TODO: parse out what gets passed into the model
  let movie;
  postMovie(movie)
  .then(_=> {
    res.sendStatus(201);
  })
  .catch(err => {
    console.error(new Error(err))
    res.sendStatus(500);
  })
})

app.post('./postMusic', (req, res) => {
  //TODO: parse out what gets passed into the model
  let music;
  postMusic(music)
  .then(_=> {
    res.sendStatus(201);
  })
  .catch(err => {
    console.error(new Error(err))
    res.sendStatus(500);
  })
})
