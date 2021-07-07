import React from 'react';
import Video from './Video.jsx'

class MyVideos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [
        {
          title: 'Triassic Zoo',
          link: 'https://www.youtube.com/watch?v=fRwd1zYZEAU',
          description: 'A wealthy paleo-enthusiast builds a gigantic zoo for dinosaurs on a remote island with dire consequences.'
        },
        {
          title: 'Galaxy Battle',
          link: 'https://www.youtube.com/watch?v=YUpl-OSRe5g',
          description: 'A desperate rebel faction seeks to overthrow a tyrannical interstellar empire.'
        }
      ]
    }
  }


  render () {
    let videos = this.state.videos
    return (
      <div id="my-videos">
        {videos.map((video, i)=> <Video key={i} title={video.title} link={video.link} description={video.description}/>)}
      </div>
    )
  }

}

export default MyVideos