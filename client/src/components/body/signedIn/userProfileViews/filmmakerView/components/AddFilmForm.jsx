import React from 'react';
const AddFilmForm = ({fields, onChangeTextField, handleSubmitAddFilm, filmLinkValidation}) => {
  return (
    <div id="add-film-view">
      Add Film
      <form onSubmit={handleSubmitAddFilm}>
        <div id="film-title">
          <label>
            Title:
            <input type="text" id="filmTitle" onChange={onChangeTextField} value={fields.filmTitle}></input>
          </label>
        </div>
        <div id="film-description">
          <label>
            Description:
            <input type="text" id="filmDescription" onChange={onChangeTextField} value={fields.filmDescription}></input>
          </label>
        </div>
        <div id="film-link">
          <label>
            Link:
            <input type="text" id="filmLink" onChange={onChangeTextField} value={fields.filmLink}></input>
            {filmLinkValidation}
          </label>
        </div>
        <div id="add-film-submit">
          <input type="submit" value="Add Film"></input>

        </div>
      </form>
    </div>
  )
}

export default AddFilmForm;