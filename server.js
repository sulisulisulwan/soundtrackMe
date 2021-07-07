/* eslint-disable no-unused-vars */
const express = require('express');
const axios = require('axios');
const app = express();
const port = 1337;
const {checkUsernameExists, checkEmailExists, createNewUser} = require('./models/signUpModels.js');
const {postFilm, postScore} = require('./models/uploadMediaModels.js');
const {getAllFilms, getAllScores} = require('./models/getMediaModels.js');
const {verifyAccount, loadProfile} = require('./models/signInModels.js')
const API_KEY = require('./youtubeAPIKey/key.js')
const videoExists = require('youtube-video-exists')
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
  verifyAccount(username, password)
  .then(result => {
    result ? res.sendStatus(200) : res.sendStatus(401);
  })
  .catch(err => {
    console.log(new Error(err));
    res.sendStatus(500)
  })
})

app.get('/signIn/loadProfile', (req, res) => {
  let username = req.query.username
  console.log('BACK IN THE SERVER')
  loadProfile(username)
  .then(userData => {
    res.status(200).json(userData);
  })
  .catch(err => {
    console.log(new Error(err));
    res.sendStatus(500);
  })
})








//Upload Content Routes

app.get('/verifyFilmLink', (req, res) => {
  //this method now allows the main part of the URL to be wrong.
  //This should be fixed.
  let link = req.query.link;
  let id= link.split('=')[1]
  //replace this with my own eventually
  videoExists.getVideoInfo(id)
  .then(results=> {
    res.status(200).json([results.existing, id]);
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})



app.get('/getAllFilms', (req, res) => {
  let username = req.query.username
  getAllFilms(username)
  .then(films => {
    console.log('films in server', films)
    res.status(200).json(films)
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500);
  });
})

app.get('/getAllScores', (req, res) => {
  let username = req.query.username
  getAllScores(username)
  .then(scores => {
    res.status(200).json(scores)
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500);
  });
})

app.post('/postFilm', (req, res) => {
  let film = req.body
  postFilm(film)
  .then(_=> {
    res.sendStatus(201);
  })
  .catch(err => {
    console.error(new Error(err))
    res.sendStatus(500);
  })
})


app.post('./postScore', (req, res) => {
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
