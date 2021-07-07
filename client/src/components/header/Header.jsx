/* eslint-disable react/prop-types */
import React from 'react';
import SignInArea from './SignInArea.jsx'

const Header = ({changePageState, pageState, userData}) => {

  let signedOutAssets = {
    signedOutHeader: <img id="header-icon"></img>
  }
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
  let visualAssets = userData.signedUpAs === 'composer' ? composerVisualAssets
  : userData.signedUpAs ==='filmmaker' ? filmmakerVisualAssets
  : signedOutAssets

  if (pageState === 'changeToSignedIn') {
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