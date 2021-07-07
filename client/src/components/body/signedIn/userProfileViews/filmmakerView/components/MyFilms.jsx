import React from 'react';
import Film from './Film.jsx'

class MyFilms extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    let myFilms = this.props.myFilms
    console.log(myFilms)
    return (
      <div id="my-films">
        {myFilms.map((film, i)=> <Film key={i} title={film.filmTitle} link={film.filmLink} description={film.filmDescription}/>)}
      </div>
    )
  }

}

export default MyFilms