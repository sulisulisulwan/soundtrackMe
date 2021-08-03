import React from 'react';

const Score = ({scoreData}) => {
  let id = scoreData._id
  let username = scoreData.username
  let scoreDescription = scoreData.scoreDescription
  let scoreLink = './uploads/' + scoreData._id + '.mp3'
  let scoreTitle = scoreData.scoreTitle
  let isFavorite = scoreData.isFavorite;
  let filmId = scoreData.filmId
  let filmmaker = scoreData.filmmaker
  let filmTitle = scoreData.filmTitle
  let filmDescription = scoreData.filmDescription
  let filmLink = './uploads/' + scoreData.filmId + '.mp4'

  let favoriteStatus = '';
  if (isFavorite) {
    favoriteStatus = 'YOUR SCORE HAS BEEN FAVORITED!'
  }

  return (
    <div>
      <div className="score-wrapper">
        <div className="score">
          <div className="favorite-status">{favoriteStatus}</div>
          <div className="score-title">{scoreTitle}</div>
          <div className="score-description">{scoreDescription}</div>
          <div className="score-link">
            <audio controls>
              <source src={scoreLink} type="audio/mp3"></source>
            </audio>
          </div>
        </div>
        <div className="score-film">
          <div className="score-film-title">{filmTitle}</div>
          <div className="score-filmmaker">@{filmmaker}</div>
          <div className="score-film-description">{filmDescription}</div>
          <div className="score-film-link">
            <video height="250px" controls>
              <source src={filmLink}></source>
            </video>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Score;