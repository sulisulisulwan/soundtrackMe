import React from 'react';
import MyVideos from './components/MyVideos.jsx'
import AddVideoForm from './components/AddVideoForm.jsx'

class FilmmakerView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoTitle: '',
      videoDescription: '',
      videoLink: '',
      addVideoFormIsOpen: false,
      addVideoButtonIsHidden: false
    }

    this.handleSubmitAddVideo = this.handleSubmitAddVideo.bind(this);
    this.openAddVideoForm = this.openAddVideoForm.bind(this);
    this.onChangeTextField = this.onChangeTextField.bind(this);
  }

  onChangeTextField (e) {
    let field = e.target.id;
    let fieldValue = e.target.value;
    let newValue = {};
    newValue[field] = fieldValue
    this.setState(newValue);
  }

  openAddVideoForm(e) {
    this.setState({
      addVideoFormIsOpen: true,
      addVideoButtonIsHidden: true
    })
  }

  handleSubmitAddVideo (e) {
    e.preventDefault()
    this.setState({
      addVideoFormIsOpen: false,
      addVideoButtonIsHidden: false
    })
  }

  render () {
    let userData = this.props.userData
    let username = userData.username;
    let fields = this.state;
    let addVideoFormIsOpen = this.state.addVideoFormIsOpen;
    let addVideoButtonIsHidden = this.state.addVideoButtonIsHidden;
    let openAddVideoForm = this.openAddVideoForm;
    let handleSubmitAddVideo = this.handleSubmitAddVideo;
    let onChangeTextField =  this.onChangeTextField;
    let addVideoForm = addVideoFormIsOpen ? <AddVideoForm
      fields={fields}
      onChangeTextField={onChangeTextField}
      handleSubmitAddVideo={handleSubmitAddVideo}
    /> : ''
    return (
      <div id="filmmaker-view">
        <div id="open-add-video-form">
          <button type="button" onClick={openAddVideoForm} hidden={addVideoButtonIsHidden}>Add Video</button>
        </div>
        {addVideoForm}
        <MyVideos />
      </div>
    )
  }
}

export default FilmmakerView;