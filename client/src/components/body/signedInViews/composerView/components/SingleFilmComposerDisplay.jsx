import React from 'react';

const SingleFilmComposerDisplay = ({id, title, filmmaker, link, description, addScoreToFilm, openAddScoreForm, getMediaElement}) => {
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
          <video id={id + 'vid'} className="film-video" controls>
            <source src={filmFile}></source>
          </video>
        </div>
        <button id={id} onClick={getMediaElement}>get Media Element</button>
        <button id={filmData} className="score-it-button" onClick={openAddScoreForm}>Score It!</button>
      </div>
    </div>
  )
}

export default SingleFilmComposerDisplay;