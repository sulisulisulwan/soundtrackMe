import React from 'react';
import MyFilms from './components/MyFilms.jsx'
import AddFilmForm from './components/AddFilmForm.jsx'
import axios from 'axios';

class FilmmakerView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filmTitle: '',
      filmDescription: '',
      filmLink: '',
      addFilmFormIsOpen: false,
      addFilmButtonIsHidden: false,
      filmLinkValidation: '',
      myFilms: []
    }

    this.handleSubmitAddFilm = this.handleSubmitAddFilm.bind(this);
    this.openAddFilmForm = this.openAddFilmForm.bind(this);
    this.onChangeTextField = this.onChangeTextField.bind(this);
  }

  onChangeTextField (e) {
    let field = e.target.id;
    let fieldValue = e.target.value;
    let newValue = {};
    newValue[field] = fieldValue
    this.setState(newValue);
  }

  openAddFilmForm(e) {
    this.setState({
      addFilmFormIsOpen: true,
      addFilmButtonIsHidden: true
    })
  }

  handleSubmitAddFilm (e) {
    let username = this.props.userData.username;
    let filmTitle = this.state.filmTitle;
    let filmDescription = this.state.filmDescription;
    let filmLink = this.state.filmLink;
    e.preventDefault()
    axios.get(`/verifyFilmLink?link=${filmLink}`)
    .then(result => {
      if (!result.data[0]) {
        throw 'link does not exist'
      }
      let addFilmFields = {
        username: username,
        filmTitle: filmTitle,
        filmDescription: filmDescription,
        filmLink: result.data[1]
      }
      axios.post('/postFilm', addFilmFields)
    })
    .then(_=> {
      return axios.get(`/getAllFilms?username=${username}`)
    })
    .then(films => {
      let myFilms = this.state.myFilms
      myFilms.push(films.data)
      this.setState({
        myFilms: myFilms,
        addFilmFormIsOpen: false,
        addFilmButtonIsHidden: false
      })
    })
    .catch(err => {
      if (err.toString() === 'link does not exist') {
        this.setState({
          filmLinkValidation: 'This film link isn\'t valid'
        })
      }
      console.error(new Error(err))
    });
  }

  componentDidMount() {
    let username = this.props.userData.username
    return axios.get(`/getAllFilms?username=${username}`)
    .then(films => {
      this.setState({
        myFilms: films.data
      })
    })
  }

  render () {
    let userData = this.props.userData
    let username = userData.username;
    let fields = this.state;
    let myFilms = this.state.myFilms;
    let addFilmFormIsOpen = this.state.addFilmFormIsOpen;
    let addFilmButtonIsHidden = this.state.addFilmButtonIsHidden;
    let filmLinkValidation = this.state.filmLinkValidation;
    let openAddFilmForm = this.openAddFilmForm;
    let handleSubmitAddFilm = this.handleSubmitAddFilm;
    let onChangeTextField =  this.onChangeTextField;
    let addFilmForm = addFilmFormIsOpen ? <AddFilmForm
      fields={fields}
      filmLinkValidation={filmLinkValidation}
      onChangeTextField={onChangeTextField}
      handleSubmitAddFilm={handleSubmitAddFilm}
    /> : ''
    return (
      <div id="filmmaker-view">
        <div id="open-add-film-form">
          <button type="button" onClick={openAddFilmForm} hidden={addFilmButtonIsHidden}>Add Film</button>
        </div>
        {addFilmForm}
        <MyFilms myFilms={myFilms}/>
      </div>
    )
  }
}

export default FilmmakerView;