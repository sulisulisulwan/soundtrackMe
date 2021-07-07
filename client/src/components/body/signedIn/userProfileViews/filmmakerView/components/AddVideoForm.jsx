import React from 'react';
const AddVideoForm = ({fields, onChangeTextField, handleSubmitAddVideo, videoLinkValidation}) => {
  return (
    <div id="add-video-view">
      Add Video
      <form onSubmit={handleSubmitAddVideo}>
        <div id="video-title">
          <label>
            Title:
            <input type="text" id="videoTitle" onChange={onChangeTextField} value={fields.videoTitle}></input>
          </label>
        </div>
        <div id="video-description">
          <label>
            Description:
            <input type="text" id="videoDescription" onChange={onChangeTextField} value={fields.videoDescription}></input>
          </label>
        </div>
        <div id="video-link">
          <label>
            Link:
            <input type="text" id="videoLink" onChange={onChangeTextField} value={fields.videoLink}></input>
            {videoLinkValidation}
          </label>
        </div>
        <div id="add-video-submit">
          <input type="submit" value="Add Video"></input>

        </div>
      </form>
    </div>
  )
}

export default AddVideoForm;