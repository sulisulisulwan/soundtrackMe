import React from 'react';
import MyVideos from './components/MyVideos.jsx'
import AddVideoForm from './components/AddVideoForm.jsx'
import axios from 'axios';

class FilmmakerView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoTitle: '',
      videoDescription: '',
      videoLink: '',
      addVideoFormIsOpen: false,
      addVideoButtonIsHidden: false,
      videoLinkValidation: ''
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
    axios.get(`/verifyVideoLink?link=${this.state.videoLink}`)
    .then(result => {
      console.log(result)
      return;
      if (result === false) {
        throw 'link does not exist'
      }
      let addMovieFields = {
        username: this.props.userData.username,
        videoTitle: this.state.videoTitle,
        videoDescription: this.state.videoDescription,
        videoLink: this.state.videoLink
      }
      axios.post('/postMovie', addMovieFields)
      .then(result => {
        console.log(result);
        this.setState({
          addVideoFormIsOpen: false,
          addVideoButtonIsHidden: false
        })
      })
    })
    .catch(err => {
      if (err.toString() === 'link does not exist') {
        this.setState({
          videoLinkValidation: 'This video link isn\'t valid'
        })
      }
      console.error(new Error(err))
    })
  }

  render () {
    let userData = this.props.userData
    let username = userData.username;
    let fields = this.state;
    let addVideoFormIsOpen = this.state.addVideoFormIsOpen;
    let addVideoButtonIsHidden = this.state.addVideoButtonIsHidden;
    let videoLinkValidation = this.state.videoLinkValidation;
    let openAddVideoForm = this.openAddVideoForm;
    let handleSubmitAddVideo = this.handleSubmitAddVideo;
    let onChangeTextField =  this.onChangeTextField;
    let addVideoForm = addVideoFormIsOpen ? <AddVideoForm
      fields={fields}
      videoLinkValidation={videoLinkValidation}
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