import React from 'react';

const SingleFilmComposerDisplay = ({id, title, link, description}) => {
  return (
    <div className="film-wrapper">
      <div className="film-info-wrapper">
        <div className="film-title">{title}</div>
        <div className="film-description">{description}</div>
        <div className="film-link">{link}</div>
      </div>
    </div>
  )
}

export default SingleFilmComposerDisplay;