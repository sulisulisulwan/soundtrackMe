import React from 'react';

class FilmmakerView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    let userData = this.props.userData
    return (
      <div>
        Filmmaker View

        {JSON.stringify(userData)}
      </div>
    )
  }
}

export default FilmmakerView;