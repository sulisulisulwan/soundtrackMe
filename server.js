/* eslint-disable no-unused-vars */
const express = require('express');
const axios = require('axios');
const multer = require('multer');
const app = express();
const port = 1337;
const {checkUsernameExists, checkEmailExists, createNewUser} = require('./models/signUpModels.js');
const {getAllFilms, getFilm, getAllScores} = require('./models/getMediaModels.js');
const {postFilmInfo, postScoreInfo} = require('./models/postMediaModels.js');
const {deleteFilm, deleteScore} = require('./models/deleteMediaModels.js');
const {verifyAccount, loadProfile} = require('./models/signInModels.js')
const {putFavoriteOnScore} = require('./models/putMediaModels.js')

let idTransfer;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'client/public/uploads');
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    let splitFileName = originalname.split('.')
    let suffix = splitFileName[splitFileName.length - 1]
    let newFileName = idTransfer + '.' + suffix
    cb(null, newFileName)
  }
})

const upload = multer({ storage: storage})

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

/**************************************
 *
 *      SIGN IN / LOAD PROFILE ROUTES
 *
 *************************************/



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

/****************************
 *
 *        CRUD Films
 *
 ****************************/


app.get('/getAllFilms', (req, res) => {
  console.log(' QUERY!!!!!', req.query.username)
  getAllFilms(req.query.username)
  .then(films => {
    console.log(films)
    res.status(200).json(films)
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500);
  });
})

app.get('/getFilm', (req, res) => {
  getFilm(req.query.id)
  .then(film => {
    res.status(200).json(film)
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
})

app.post('/postFilmInfo', (req, res) => {
  //this isn't restful neither is postScore.  fix that later
  let film = req.body
  postFilmInfo(film)
  .then(result=> {
    console.log(result._id)
    idTransfer = result._id
    res.status(201).json(result);
  })
  .catch(err => {
    console.error(new Error(err))
    res.sendStatus(500);
  })
})

app.post('/postFilmFile', upload.single('filmFile'), (req, res) => {
  res.sendStatus(201)
})

app.delete('/deleteFilm', (req, res) => {
  let id = req.body.id
  deleteFilm(id)
  .then(result=>{
    res.status(200).json(id);
  })
  .catch(err => {
    console.error(err)
    res.sendStatus(500)
  })
})



/****************************************
 *
 *          CRUD Scores
 *
 ****************************************/


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


app.post('/postScoreInfo', (req, res) => {
  let scoreData = (req.body);
  postScoreInfo(scoreData)
  .then(scoreResult => {
    idTransfer = scoreResult._id
    res.status(201).json(scoreResult);
  })
  .catch(err => {
    console.error(new Error(err))
    res.sendStatus(500);
  })
})

app.put('/favoriteAScore', (req, res) => {
  let id = req.body.id
  putFavoriteOnScore(id)
  .then(result => {
    res.sendStatus(201);
  })
  .catch(err => {
    res.sendStatus(500);
  })
})
app.put('/updateMyFilms', (req, res) => {
  let myFilms = req.body.myFilms
  putFavoriteOnScore(myFilms)
  .then(result => {
    res.sendStatus(201);
  })
  .catch(err => {
    res.sendStatus(500);
  })
})

app.post('/postScoreFile', upload.single('scoreFile'), (req, res) => {
  res.sendStatus(201)
})
