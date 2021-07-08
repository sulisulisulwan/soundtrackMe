import React from 'react';
const AddScoreForm = ({addScoreToFilm, filmTitle, filmId, fields, onChangeTextField}) => {
  return (
    <div id="add-score-view">
      Add Score to {filmTitle}
      <form id={filmId} onSubmit={addScoreToFilm}>
        <div id="score-title">
          <label>
            Title:
            <input type="text" id="scoreTitle" onChange={onChangeTextField} value={fields.scoreTitle}></input>
          </label>
        </div>
        <div id="score-description">
          <label>
            Description:
            <input type="text" id="scoreDescription" onChange={onChangeTextField} value={fields.scoreDescription}></input>
          </label>
        </div>
        <div id="score-link">
          <label>
            Link:
            <input type="text" id="filmLink" onChange={onChangeTextField} value={fields.scoreLink}></input>
            {fields.scoreLinkValidation}
          </label>
        </div>
        <div id="add-score-submit">
          <input type="submit" value="Add Score"></input>

        </div>
      </form>
    </div>
  )
}

export default AddScoreForm;