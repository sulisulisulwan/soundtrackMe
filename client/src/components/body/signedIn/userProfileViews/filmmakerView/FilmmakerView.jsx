import React from 'react';
import MyFilms from './components/MyFilms.jsx'
import axios from 'axios';

class FilmmakerView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filmTitle: '',
      filmDescription: '',
      filmFile: '',
      myFilms: []
    }
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleEmailComposer = this.handleEmailComposer.bind(this);
    this.handleSubmitAddFilm = this.handleSubmitAddFilm.bind(this);
    this.onChangeTextField = this.onChangeTextField.bind(this);
    this.deleteFilmButtonHandler = this.deleteFilmButtonHandler.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  handleEmailComposer(e) {
    let email = e.target.id;
    alert(`You loved this score so much you decided to email the composer at ${email}!  Or at least we assumed so.`)
  }

  handleFavorite(e) {
    let id = e.target.id;
    let myFilms = this.state.myFilms;
    axios.put('favoriteAScore', {
      id: id
    })
    .then(result => {
      for (let i = 0; i < myFilms.length; i++) {
        let film = myFilms[i]
        if (film.filmScores.some(score => {
          if (score.scoreId === id) {
            score.isFavorite = true;
            return true;
          }
          return false;
        })) {
          break;
        }
      }
    //   axios.put('/updateMyFilms', {myFilms: myFilms})
    // })
    // .then(_ => {
      this.setState({
        myFilms: myFilms
      })
    })
    .catch(err => {
      console.error(new Error(err))
    })
  }

  onChangeTextField (e) {
    let field = e.target.id;
    let fieldValue = e.target.value;
    let newValue = {};
    newValue[field] = fieldValue
    this.setState(newValue);
  }

  onFileChange (e) {
    this.setState({filmFile: e.target.files[0]});
  }

  handleSubmitAddFilm (e) {
    e.preventDefault()
    let username = this.props.userData.username;
    let filmTitle = this.state.filmTitle;
    let filmDescription = this.state.filmDescription;
    let filmLink = this.state.filmLink;
    let addFilmFields = {
      username: username,
      filmTitle: filmTitle,
      filmDescription: filmDescription,
    }
    return axios.post('/postFilmInfo', addFilmFields)
    .then(res => {
      let id = res.data._id
      let filmFile = this.state.filmFile
      const formData = new FormData()
      formData.append('filmFile', filmFile);
      axios.post('/postFilmFile', formData, {})
    })
    .then(_=> {
      return axios.get(`/getAllFilms?username=${username}`)
    })
    .then(myFilms => {
      this.setState({
        myFilms: myFilms.data,
        filmTitle: '',
        filmDescription: '',
        filmFile: '',
      })
    })
    .catch(err => {
      console.error(new Error(err))
    });
  }

  deleteFilmButtonHandler (e) {
    let id = e.target.id
    axios.delete('/deleteFilm', {data: {id: id}})
    .then(_=> {
      return axios.get(`/getAllFilms?username=${this.props.userData.username}`)
    })
    .then(myFilms => {
      console.log(myFilms.data)
      this.setState({
        myFilms: myFilms.data
      })
    })
  }

  componentDidMount() {
    let username = this.props.userData.username
    return axios.get(`/getAllFilms?username=${username}`)
    .then(myFilms => {
      this.setState({
        myFilms: myFilms.data
      })
    })
  }

  render () {
    let userData = this.props.userData
    let username = userData.username;
    let fields = this.state;
    let myFilms = this.state.myFilms;
    let handleFavorite = this.handleFavorite;
    let handleEmailComposer = this.handleEmailComposer;
    let onFileChange = this.onFileChange;
    let handleSubmitAddFilm = this.handleSubmitAddFilm;
    let onChangeTextField = this.onChangeTextField;
    let deleteFilmButtonHandler = this.deleteFilmButtonHandler;
    return (
      <div id="filmmaker-view-wrapper">
        <MyFilms
          fields={fields}
          myFilms={myFilms}
          onFileChange={onFileChange}
          handleEmailComposer={handleEmailComposer}
          handleFavorite={handleFavorite}
          onChangeTextField={onChangeTextField}
          handleSubmitAddFilm={handleSubmitAddFilm}
          deleteFilmButtonHandler={deleteFilmButtonHandler}/>
      </div>
    )
  }
}

export default FilmmakerView;