import React from 'react';
import SingleFilmComposerDisplay from './SingleFilmComposerDisplay.jsx'
import AddScoreForm from './AddScoreForm.jsx'
class FilmsComposerDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    let fields = this.props.fields
    let formFilmTitle = this.props.formFilmTitle
    let formFilmId = this.props.formFilmId
    let allFilms = this.props.allFilms;
    let openAddScoreForm = this.props.openAddScoreForm
    let addScoreToFilm = this.props.addScoreToFilm;
    let addScoreFormIsOpen = this.props.addScoreFormIsOpen;
    let addScoreForm = addScoreFormIsOpen ?
      <AddScoreForm
        fields={fields}
        filmTitle={formFilmTitle}
        filmId={formFilmId}
        addScoreToFilm={addScoreToFilm}
        onChangeTextField={onChangeTextField}
      /> : null

    return (
      <div>
        <div id="all-films-composer-display">
          {allFilms.map((film, i) =>
            <SingleFilmComposerDisplay
              key={i}
              id={film._id}
              title={film.filmTitle}
              link={film.filmLink}
              description={film.filmDescription}
              openAddScoreForm={openAddScoreForm}
            />)}
        </div>
        <div>{addScoreForm}</div>
      </div>
    )
  }
}

export default FilmsComposerDisplay