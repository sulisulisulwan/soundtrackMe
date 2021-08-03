import React from 'react';
const AddScoreForm = ({addScoreToFilm, filmTitle, filmId, fields, onChangeTextField, closeAddScoreForm, onFileChange}) => {
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
        <div id="upload-score">
          <label>
            Upload Audio:
            <input type="file" id="uploadFile" onChange={onFileChange}></input>
          </label>
        </div>
        <div id="add-score-submit">
          <button id="back-button" type="button" onClick={closeAddScoreForm}>Back</button>
          <input id="submit-button" type="submit" value="Add Score"></input>
        </div>
      </form>
    </div>
  )
}

export default AddScoreForm;