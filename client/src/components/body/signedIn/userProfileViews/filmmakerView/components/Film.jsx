import React from 'react';

const Film = ({id, title, link, description, deleteFilmButtonHandler}) => {
  return (
    <div className="film-wrapper">
      <div className="film-info-wrapper">
        <div className="film-title">{title}</div>
        <div className="film-description">{description}</div>
        <div className="film-link">{link}</div>
      </div>
      <div id={id} className="remove-film-button" onClick={deleteFilmButtonHandler}>X</div>
    </div>
  )
}

export default Film;