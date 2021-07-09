import React from 'react';
const AddFilmForm = ({fields, onChangeTextField, handleSubmitAddFilm, onFileChange, closeAddFilmForm}) => {
  return (
    <div id="add-film-form">
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
        <div id="film-file">
          <label>
            Upload Video:
            <input type="file" id="uploadFile" onChange={onFileChange}></input>
          </label>
        </div>
        <div id="add-film-submit">
          <input id="submit-add-film-form" type="submit" value="Add Film"></input>
        </div>
      </form>
    </div>
  )
}

export default AddFilmForm;