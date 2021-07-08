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
      addScoreButtonIsHidden: false,
      scoreLinkValidation: '',
      allFilms: [],
      myScores: {}
    }
    this.onChangeTextField = this.onChangeTextField.bind(this);
  }


  onChangeTextField (e) {
    let field = e.target.id;
    let fieldValue = e.target.value;
    let newValue = {};
    newValue[field] = fieldValue
    this.setState(newValue);
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
    let userData = this.props.userData;
    let allFilms = this.state.allFilms;
    return (
      <div id="composer-view">
        <div id="film-feed-title">
          Film Feed
        </div>
        <FilmsDisplay allFilms={allFilms}/>
      </div>
    )
  }
}

export default ComposerView;