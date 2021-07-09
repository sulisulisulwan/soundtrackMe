import React from 'react';
import Film from './Film.jsx'
import AddFilmForm from './AddFilmForm.jsx'
const MyFilms = ({fields, myFilms, onFileChange, handleFavorite, handleEmailComposer, onChangeTextField, handleSubmitAddFilm, deleteFilmButtonHandler}) => {

  return (
    <div id="filmmaker-view">
      <div id="my-films">
        {myFilms.map((film, i)=> <Film
          key={i}
          filmData={film}
          handleEmailComposer={handleEmailComposer}
          handleFavorite={handleFavorite}
          deleteFilmButtonHandler={deleteFilmButtonHandler}/>)}
      </div>
      <AddFilmForm
    fields={fields}
    onFileChange={onFileChange}
    onChangeTextField={onChangeTextField}
    handleSubmitAddFilm={handleSubmitAddFilm}
    />
    </div>
  )
}



export default MyFilms