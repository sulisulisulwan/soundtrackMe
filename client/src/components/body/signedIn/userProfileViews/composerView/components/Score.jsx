import React from 'react';

const Score = ({scoreData}) => {
  let id = scoreData._id
  let username = scoreData.username
  let scoreDescription = scoreData.scoreDescription
  let scoreLink = scoreData.scoreLink
  let scoreTitle = scoreData.scoreTitle
  let filmId = scoreData.filmId
  let filmmaker = scoreData.filmmaker
  let filmTitle = scoreData.filmTitle
  let filmDescription = scoreData.filmDescription
  let filmLink = scoreData.filmLink
  console.log(filmLink)
  return (
    <div>
      <div className="score-wrapper">
        <div className="score">
          <div className="score-title">{scoreTitle}</div>
          <div className="score-description">{scoreDescription}</div>
          <div className="score-link">{scoreLink}</div>
        </div>
        <div className="score-film">
          <div className="score-film-title">{filmTitle}</div>
          <div className="score-filmmaker">@{filmmaker}</div>
          <div className="score-film-description">{filmDescription}</div>
          <div className="score-film-link">{filmLink}</div>
        </div>
      </div>
    </div>
  )
}
export default Score;