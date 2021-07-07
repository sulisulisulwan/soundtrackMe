import React from 'react';

const Video = ({title, link, description}) => {
  return (
    <div className="video-wrapper">
      <div className="video-title">{title}</div>
      <div className="video-link">{link}</div>
      <div className="video-description">{description}</div>
    </div>
  )
}

export default Video;