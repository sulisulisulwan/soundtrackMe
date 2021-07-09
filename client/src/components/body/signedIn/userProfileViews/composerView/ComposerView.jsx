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
      scoreFile: '',
      addScoreFormIsOpen: false,
      addScoreButtonIsDisabled: false,
      formFilmId: '',
      formFilmTitle: '',
      allFilms: [],
      myScores: []
    }
    this.addScoreToFilm = this.addScoreToFilm.bind(this);
    this.openAddScoreForm = this.openAddScoreForm.bind(this);
    this.closeAddScoreForm = this.closeAddScoreForm.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onChangeTextField = this.onChangeTextField.bind(this);
  }

  onFileChange (e) {
    this.setState({scoreFile: e.target.files[0]});
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
    let email = this.props.userData.email;
    let filmId = e.target.id
    let scoreTitle = this.state.scoreTitle;
    let scoreDescription = this.state.scoreDescription;
    axios.get(`/getFilm?id=${filmId}`)
    .then(film => {
      let {filmDescription, filmTitle} = film.data
      let filmmaker = film.data.username
      let addScoreFields = {
        username: username,
        email: email,
        scoreTitle: scoreTitle,
        scoreDescription: scoreDescription,
        filmId: filmId,
        filmmaker: filmmaker,
        filmTitle: filmTitle,
        filmDescription: filmDescription
      }
      return axios.post('/postScoreInfo', addScoreFields)
    })
    .then(res => {
      let id = res.data._id
      let scoreFile = this.state.scoreFile
      const formData = new FormData()
      formData.append('scoreFile', scoreFile);
      axios.post('/postScoreFile', formData, {})
    })
    .then(_ => {
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
    let onFileChange = this.onFileChange;
    let rightPanel;
    if (addScoreFormIsOpen) {
      rightPanel = <AddScoreForm
        fields={fields}
        filmTitle={formFilmTitle}
        filmId={formFilmId}
        addScoreToFilm={addScoreToFilm}
        onChangeTextField={onChangeTextField}
        onFileChange={onFileChange}
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