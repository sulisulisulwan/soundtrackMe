import React from 'react';
import MyScores from './components/MyScores.jsx'
import Score from './components/Score.jsx'
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
      myScores: []
    }
    this.addScoreToFilm = this.addScoreToFilm.bind(this);
    this.openAddScoreForm = this.openAddScoreForm.bind(this);
    this.closeAddScoreForm = this.closeAddScoreForm.bind(this);
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
    let filmData = JSON.parse(e.target.id)
    let id = filmData.id
    let title = filmData.title
    this.setState({
      addScoreFormIsOpen: true,
      formFilmId: id,
      formFilmTitle: title
    });
  }

  closeAddScoreForm (e) {
    this.setState({
      addScoreFormIsOpen: false,
      formFilmId: '',
      formFilmTitle: ''
    })
  }

  addScoreToFilm (e) {
    e.preventDefault();
    let username = this.props.userData.username;
    let filmId = e.target.id
    let scoreTitle = this.state.scoreTitle;
    let scoreDescription = this.state.scoreDescription;
    let scoreLink = this.state.scoreLink;
    axios.get(`/verifyScoreLink?link=${scoreLink}`)
    .then(result => {
      if (result.data === false) {
        throw 'link does not exist'
      }
      return axios.get(`/getFilm?id=${filmId}`)
    })
    .then(film => {
      console.log(film)
      let {filmDescription, filmLink, filmTitle} = film.data
      let filmmaker = film.data.username
      let addScoreFields = {
        username: username,
        scoreTitle: scoreTitle,
        scoreDescription: scoreDescription,
        scoreLink: scoreLink,
        filmId: filmId,
        filmmaker: filmmaker,
        filmTitle: filmTitle,
        filmDescription: filmDescription,
        filmLink: filmLink
      }
      axios.post('/postScore', addScoreFields)
    })
    .then(_=> {
      return axios.get(`/getAllScores?username=${username}`)
    })
    .then(allScores => {
      console.log(allScores)
      this.setState({
        myScores: allScores.data,
        addScoreFormIsOpen: false,
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
    let username = this.props.userData.username;
    let getAllFilms = axios.get(`/getAllFilms`)
    let getAllScores = axios.get(`/getAllScores?username=${username}`)
    Promise.all([getAllFilms, getAllScores])
    .then(allFilmsAndScores => {
      let [allFilms, myScores] = allFilmsAndScores;
      this.setState({
        allFilms: allFilms.data,
        myScores: myScores.data
      })
    })
  }

  render () {
    let fields = this.state;
    let formFilmId = this.state.formFilmId
    let formFilmTitle = this.state.formFilmTitle
    let userData = this.props.userData;
    let allFilms = this.state.allFilms;
    let myScores = this.state.myScores;
    let addScoreFormIsOpen = this.state.addScoreFormIsOpen;
    let addScoreToFilm = this.addScoreToFilm
    let openAddScoreForm = this.openAddScoreForm
    let closeAddScoreForm = this.closeAddScoreForm;
    let onChangeTextField = this.onChangeTextField
    let rightPanel;
    if (addScoreFormIsOpen) {
      rightPanel = <AddScoreForm
        fields={fields}
        filmTitle={formFilmTitle}
        filmId={formFilmId}
        addScoreToFilm={addScoreToFilm}
        onChangeTextField={onChangeTextField}
        closeAddScoreForm={closeAddScoreForm}
      />
    } else {
      rightPanel = (
        <div id="my-scored-films">
          <div id="my-scored-films-title">My Scored Films</div>
          {myScores.map(score => <Score
            key={score._id}
            scoreData={score}
          />)}
        </div>
      )
    }
    return (
      <div id="composer-view">
        <div id="all-films-wrapper">
          <div id="film-feed-title">
            Film Feed
          </div>
          <FilmsDisplay
            allFilms={allFilms}
            addScoreFormIsOpen={addScoreFormIsOpen}
            formFilmTitle={formFilmTitle}
            formFilmId={formFilmId}
            fields={fields}
            openAddScoreForm={openAddScoreForm}
            addScoreToFilm={addScoreToFilm}
            onChangeTextField={onChangeTextField}/>
        </div>
        {rightPanel}
      </div>
    )
  }
}

export default ComposerView;