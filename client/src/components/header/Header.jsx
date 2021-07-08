/* eslint-disable react/prop-types */
import React from 'react';
import SignInArea from './SignInArea.jsx'

const Header = ({changePageState, pageState, userData, signOut}) => {
  let visualAssets;
  if (pageState === 'changeToSignedIn') {
    let composerVisualAssets = {
      signedUpHeader:
        <div id="header-icon-wrapper">
          <img id="header-icon" src="./icons/composerIcon.jpg"></img>
        </div>
    }
    let filmmakerVisualAssets = {
      signedUpHeader:
        <div id="header-icon-wrapper">
          <img id="header-icon" src="./icons/filmmakerIcon.jpg"></img>
        </div>
    }
    visualAssets = userData.signedUpAs === 'composer' ? composerVisualAssets : filmmakerVisualAssets
    return (
      <header>
        <div id="navbar">
          {visualAssets.signedUpHeader}
          <span id="header-username">@{userData.username}</span>
          <span id="soundtrack-me-title">SoundTrack Me</span>
          <SignInArea
            changePageState={changePageState}
            pageState={pageState}
            signOut={signOut}
          />
        </div>
      </header>
    );
  } else {
    visualAssets = {
      signedOutHeader: <img id="header-icon"></img>
    }
    return (
      <header>
        <div id="navbar">
          {visualAssets.signedOutHeader}
          <span>SoundTrack Me</span>
          <SignInArea
            changePageState={changePageState}
            pageState={pageState}
          />
        </div>
      </header>
    );

  }
}

export default Header;