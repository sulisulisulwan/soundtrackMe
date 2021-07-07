import React from 'react';
import MyVideos from './components/MyVideos.jsx'

class FilmmakerView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadVideoField: ''
    }
    this.onChangeTextField = this.onChangeTextField.bind(this);
  }

  onChangeTextField (e) {
    let field = e.target.id;
    let fieldValue = e.target.value;
    let newValue = {field: fieldValue};
    this.setState(newValue);
  }


  render () {
    let userData = this.props.userData
    let username = userData.username;
    let uploadVideoField = this.state.uploadVideoField
    let onChangeTextField =  this.onChangeTextField
    return (
      <div>
        <form id="video-upload-view">
          <label>
            Add video link:
            <input type="text" onChange={onChangeTextField} value={uploadVideoField}></input>
          </label>
        </form>
        <MyVideos />
      </div>
    )
  }
}

export default FilmmakerView;