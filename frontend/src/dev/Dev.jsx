import React from 'react';
import { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

const VideoAudioSyncTool = () => {

  const [maxDuration, setMaxDuration] = useState([0, 0]);
  const [inputMinutes, setInputMinutes] = useState('')
  const [inputSeconds, setInputSeconds] = useState('')
  const [startTime, setStartTime] = useState(0)
  let video;
  let audio;
  let minutesElement = document.getElementById('input-minutes')
  let secondsElement = document.getElementById('input-seconds')

  const syncAudioToVideoByStartTime = () => {
    if (video.currentTime > startTime) {
      if (video.seeking) {
        audio.currentTime = video.currentTime + startTime;
      }
      audio.play();
    }
    if (video.currentTime < startTime) {
      audio.currentTime = 0;
    }
  }

  const onVideoPause = () => {
    audio.pause();
  }

  const onVideoDurationChange = () => {
    let duration = Math.floor(video.duration);
    let maxMinutes = Math.floor(duration / 60);
    let maxSeconds =duration % 60
    setMaxDuration([maxMinutes, maxSeconds]);
  }


  useEffect(() => {
    video = document.getElementById('video'); //this needs to be changed
    audio = document.getElementById('audio'); //this needs to be changed
    video.addEventListener('durationchange', onVideoDurationChange)
    video.addEventListener('pause', onVideoPause)
  })

  useEffect(() => {
    if (Number(inputSeconds) > 59) {
      setInputSeconds(59)
    }
    if (Number(inputMinutes) > 59) {
      setInputMinutes(59)
    }
  }, [inputSeconds, inputMinutes])

  useEffect(() => {
    video = document.getElementById('video'); //this needs to be changed
    video.addEventListener('timeupdate', syncAudioToVideoByStartTime)
    return () => {
      video.removeEventListener('timeupdate', syncAudioToVideoByStartTime)
    }
  }, [startTime])


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

  const setStarttimeClickHandler = () => {
    let totalSeconds = (Number(inputMinutes) * 60) + Number(inputSeconds);
    setStartTime(totalSeconds);
  }


  return (
    <>
      <h2>Video Title</h2>
      <h3>@Filmmaker</h3>
      <div className="video-audio-wrapper">
        <div className="video-wrapper">
          <video id="video" className="video-tool" controls width="500px">
            <source src="/uploads/movie.mp4" type="video/mp4" muted></source>
          </video>
        </div>
        <div className="audio-wrapper">
          <audio id="audio" className="audio-tool" controls>
            <source src="/uploads/audio.mp3"></source>
          </audio>
        </div>
        <div className="sync-controls-wrapper">
          <div className="sync-controls">
            Start score at:
            <input id="input-minutes" className="audio-start-input" type="number" max={maxDuration[0]} min={0} placeholder="00" value={`${inputMinutes < 10 ? 0 : ''}${inputMinutes}`} onChange={numberInputOnChangeHandler}></input>
            :
            <input id="input-seconds" className="audio-start-input" type="number" max={59} min={0} placeholder="00" onChange={numberInputOnChangeHandler} value={`${inputSeconds < 10 ? 0 : ''}${inputSeconds}`}></input>
            <button id="set-starttime" type="button" onClick={setStarttimeClickHandler}>Set Start Time</button>
            <p className="current-starttime-display">Start set at {Math.floor(startTime / 60)}:{`${startTime % 60 < 10 ? 0 : ''}${startTime % 60}`}</p>
          </div>
        </div>
      </div>
    </>
  )
}


ReactDom.render(<VideoAudioSyncTool/>, document.getElementById('dev'))




