import React from 'react';
import { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

const VideoAudioSyncTool = () => {

  const [maxDuration, setMaxDuration] = useState([0, 0]);
  const [inputMinutes, setInputMinutes] = useState('')
  const [inputSeconds, setInputSeconds] = useState('')
  let video;
  let minutesElement = document.getElementById('input-minutes')
  let secondsElement = document.getElementById('input-seconds')
  useEffect(() => {
    video = document.querySelector('video');
    if (Number(inputSeconds) > 59) {
      setInputSeconds(59)
    }
    if (Number(inputMinutes) > 59) {
      setInputMinutes(59)
    }
    video.addEventListener('durationchange', () => {
      let duration = Math.floor(video.duration);
      let maxMinutes = Math.floor(duration / 60);
      let maxSeconds =duration % 60
      setMaxDuration([maxMinutes, maxSeconds]);
    })
  })

  const numberInputOnChangeHandler = (e) => {
    let [maxMinutes, maxSeconds] = maxDuration;
    if (e.target.id === 'input-minutes') {
      if (Number(e.target.value) > maxMinutes) {
        setInputMinutes(maxMinutes);
        if (inputSeconds > maxSeconds) {
          setInputSeconds(maxSeconds)
        }
        return;
      }
      setInputMinutes(e.target.value);
    } else if (e.target.id === 'input-seconds') {
      if (Number(minutesElement.value) === maxMinutes) {
        if (Number(e.target.value) > maxSeconds) {
          setInputSeconds(maxSeconds)
          return;
        }
      }
      setInputSeconds(e.target.value)
    }
  }


  return (
    <>
      <h2>Video Title</h2>
      <h3>@Filmmaker</h3>
      <div className="video-audio-wrapper">
        <div className="video-wrapper">
          <video className="video-tool" controls width="500px">
            <source src="/uploads/movie.mp4" type="video/mp4" muted></source>
          </video>
        </div>
        <div className="audio-wrapper">
          <audio className="audio-tool" controls>
            <source src="/uploads/audio.mp3"></source>
          </audio>
        </div>
        <div className="sync-controls">
          Start score at:
          <input id="input-minutes" className="audio-start-input" type="number" max={maxDuration[0]} placeholder="00" value={inputMinutes} onChange={numberInputOnChangeHandler}></input>
          :
          <input id="input-seconds" className="audio-start-input" type="number" max={59} placeholder="00" onChange={numberInputOnChangeHandler} value={inputSeconds}></input>
        </div>
      </div>
    </>
  )
  //
}

ReactDom.render(<VideoAudioSyncTool/>, document.getElementById('dev'))




