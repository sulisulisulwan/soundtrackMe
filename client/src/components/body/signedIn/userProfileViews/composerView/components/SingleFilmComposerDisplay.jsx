import React from 'react';

const SingleFilmComposerDisplay = ({id, title, filmmaker, link, description, addScoreToFilm, openAddScoreForm}) => {
  let filmData = JSON.stringify({
    id: id,
    title: title
  });
  return (
    <div className="film-wrapper">
      <div className="film-info-wrapper">
        <div className="film-title">{title}</div>
        <div className="filmmaker">@{filmmaker}</div>
        <div className="film-description">{description}</div>
        <div className="film-link">{link}</div>
      </div>
      <button id={filmData} onClick={openAddScoreForm}>Score It!</button>
    </div>
  )
}

export default SingleFilmComposerDisplay;