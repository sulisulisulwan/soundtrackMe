import React from 'react';

const SingleFilmComposerDisplay = ({id, title, filmmaker, link, description, addScoreToFilm, openAddScoreForm}) => {
  let filmData = JSON.stringify({
    id: id,
    title: title
  });
  let filmFile = 'uploads/' + id + '.mp4';
  return (
    <div className="film-wrapper">
      <div className="film-info-wrapper">
        <div className="filmmaker">@{filmmaker}</div>
        <div className="film-title">{title}</div>
        <div className="film-description">{description}</div>
        <div className="film-video-wrapper">
          <video className="film-video" controls>
            <source src={filmFile}></source>
          </video>
        </div>
        <button id={filmData} className="score-it-button" onClick={openAddScoreForm}>Score It!</button>
      </div>
    </div>
  )
}

export default SingleFilmComposerDisplay;