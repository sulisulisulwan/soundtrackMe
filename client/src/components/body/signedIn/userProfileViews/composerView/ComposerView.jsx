import React from 'react';

class ComposerView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render () {
    let userData = this.props.userData

    return (
      <div>
        Composer View

        {JSON.stringify(userData)}
      </div>
    )
  }
}

export default ComposerView;