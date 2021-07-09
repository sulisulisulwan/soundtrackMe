import React from 'react';

const Film = ({filmData, deleteFilmButtonHandler, handleEmailComposer, handleFavorite}) => {
  let id = filmData._id
  let title = filmData.filmTitle
  let description = filmData.filmDescription
  let filmScores = filmData.filmScores
  console.log('IS THIS EMAIL???', filmScores)
  let filmFile = './uploads/' + id + '.mp4'
  return (
    <div className="my-film-wrapper">
      <div className="film-wrapper">
        <div className="film-info-wrapper">
          <div className="film-title">{title}</div>
          <div className="film-description">{description}</div>
          <div className="film-video-wrapper">
            <video className="film-video" controls>
              <source src={filmFile}></source>
            </video>
          </div>
        </div>
        <div id={id} className="remove-film-button" onClick={deleteFilmButtonHandler}>X</div>
      <div className="scores-wrapper">

          {filmScores.map(score => {
            let candidateLink = './uploads/' + score.scoreId + '.mp3'
            let composer = score.username;
            let scoreTitle = score.scoreTitle;
            let scoreDescription = score.scoreDescription;
            let favoriteIcon = score.isFavorite ? "icons/favorited.png" : "icons/checkmark.png"
            return (
              <div key={score.scoreId} className="candidate-score">
                <div className="candidate-composer">@{composer}</div>
                <div className="candidate-score-title">{scoreTitle}</div>
                <div className="candidate-score-description">{scoreDescription}</div>
                <audio controls>
                  <source src={candidateLink}></source>
                </audio>
                <div className="interact-with-candidate">
                  <img id={score.scoreId} className="favorite" src={favoriteIcon} onClick={handleFavorite}></img>
                  <img id={score.email} className="contact" src="icons/email.png" onClick={handleEmailComposer}></img>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Film;