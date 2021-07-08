import React from 'react';
import MyScores from './components/MyScores.jsx'
import FilmsDisplay from './components/FilmsDisplay.jsx';
import AddScoreForm from './components/AddScoreForm.jsx'
import axios from 'axios';

class ComposerView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scoreTitle: '',
      scoreDescription: '',
      scoreLink: '',
      addScoreFormIsOpen: false,
      addScoreButtonIsDisabled: false,
      scoreLinkValidation: '',
      formFilmId: '',
      formFilmTitle: '',
      allFilms: [],
      myScores: {}
    }
    this.addScoreToFilm = this.addScoreToFilm.bind(this);
    this.openAddScoreForm = this.openAddScoreForm.bind(this);
    this.onChangeTextField = this.onChangeTextField.bind(this);
  }


  onChangeTextField (e) {
    let field = e.target.id;
    let fieldValue = e.target.value;
    let newValue = {};
    newValue[field] = fieldValue
    this.setState(newValue);
  }
  openAddScoreForm (e) {
    let filmData = e.target.id
    let {id, title} = filmData;
    this.setState= ({
      addScoreFormIsOpen: true,
      formFilmId: id,
      formFilmTitle: title
    });
  }

  addScoreToFilm (e) {
    let filmId= e.target.id
    let scoreTitle = this.state.scoreTitle;
    let scoreDescription = this.state.scoreDescription;
    let scoreLink = this.state.scoreLink;

    //VALIDATE SCORE LINK THROUGH SERVER
    axios.get(`/verifyScoreLink?link=${scoreLink}`)
    .then(result => {
      if (/*Some kind of result boolean*/result) {
        throw 'link does not exist'
      }
      let addScoreFields = {
        username: username,
        scoreTitle: scoreTitle,
        scoreDescription: scoreDescription,
        scoreLink: scoreLink
      }
      axios.post('/postScore', addScoreFields)
    })
    .then(_=> {
      // return axios.get(`/getAllFilms?username=${username}`)
    })
    .then(allFilms => {
      //ARE WE REALLY TRYING TO GET ALL FILMS?????
      //DO WE WANT TO BE SHOWING MY FILM SCORES IN SEPARATE LIST?

      this.setState({
        allFilms: allFilms.data,
        addScoreFormIsOpen: false,
        addScoreButtonIsDisabled: false
      })
    })
    .catch(err => {
      if (err.toString() === 'link does not exist') {
        this.setState({
          scoreLinkValidation: 'This score link isn\'t valid'
        })
      }
      console.error(new Error(err))
    });
  }


  componentDidMount() {
    return axios.get(`/getAllFilms`)
    .then(allFilms => {
      this.setState({
        allFilms: allFilms.data
      })
    })
  }

  render () {
    let fields = this.state;
    let formFilmId = this.state.formFilmId
    let formFilmTitle = this.state.formFilmTitle
    let userData = this.props.userData;
    let allFilms = this.state.allFilms;
    let addScoreFormIsOpen = this.state.addScoreFormIsOpen;
    let addScoreToFilm = this.addScoreToFilm
    let openAddScoreForm = this.openAddScoreForm
    let onChangeTextField = this.onChangeTextField
    return (
      <div id="composer-view">
        <div id="film-feed-title">
          Film Feed
        </div>
        <FilmsDisplay
          allFilms={allFilms}
          addScoreFormIsOpen={addScoreFormIsOpen}
          formFilmTitle={formFilmTitle}
          formFilmId={formFilmId}
          fields={fields}
          addScoreToFilm={addScoreToFilm}
          onChangeTextField={onChangeTextField}/>
      </div>
    )
  }
}

export default ComposerView;