import React from 'react';
import Film from './Film.jsx'

class MyFilms extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    let deleteFilmButtonHandler = this.props.deleteFilmButtonHandler;
    let myFilms = this.props.myFilms;
    console.log('myFilms in MYfilms.jsx', myFilms)
    return (
      <div id="my-films">
        {myFilms.map((film, i)=> <Film key={i} id={film._id} title={film.filmTitle} link={film.filmLink} description={film.filmDescription} deleteFilmButtonHandler={deleteFilmButtonHandler}/>)}
      </div>
    )
  }

}

export default MyFilms