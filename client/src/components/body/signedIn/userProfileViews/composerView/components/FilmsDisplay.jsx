import React from 'react';
import SingleFilmComposerDisplay from './SingleFilmComposerDisplay.jsx'

class FilmsComposerDisplay extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    let allFilms = this.props.allFilms;
    console.log(allFilms)
    return (
      <div id="all-films-composer-display">
        {allFilms.map((film, i)=> <SingleFilmComposerDisplay key={i} id={film._id} title={film.filmTitle} link={film.filmLink} description={film.filmDescription}/>)}
      </div>
    )
  }

}

export default FilmsComposerDisplay