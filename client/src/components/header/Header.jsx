/* eslint-disable react/prop-types */
import React from 'react';
import SignInArea from './SignInArea.jsx'

const Header = ({changePageState, pageState, userData}) => {
  let visualAssets;
  if (pageState === 'changeToSignedIn') {
    let composerVisualAssets = {
      signedUpHeader:
        <div id="header-icon-wrapper">
          <img id="header-icon" src="./icons/composerIcon.jpg"></img>
          <span id="header-username">@{userData.username}</span>
        </div>
    }
    let filmmakerVisualAssets = {
      signedUpHeader:
        <div id="header-icon-wrapper">
          <img id="header-icon" src="./icons/filmmakerIcon.jpg"></img>
          <span id="header-username">@{userData.username}</span>
        </div>
    }
    visualAssets = userData.signedUpAs === 'composer' ? composerVisualAssets : filmmakerVisualAssets
    return (
      <header>
        <div id="navbar">
          {visualAssets.signedUpHeader}
          <SignInArea
            changePageState={changePageState}
            pageState={pageState}
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