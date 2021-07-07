import React from 'react';

const Film = ({title, link, description}) => {
  return (
    <div className="film-wrapper">
      <div className="film-title">{title}</div>
      <div className="film-link">{link}</div>
      <div className="film-description">{description}</div>
    </div>
  )
}

export default Film;