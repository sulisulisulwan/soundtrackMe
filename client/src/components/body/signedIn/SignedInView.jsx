import React from 'react';
import ComposerView from './userProfileViews/ComposerView.jsx'
import FilmmakerView from './userProfileViews/FilmmakerView.jsx'

const SignedInView = ({userData}) => {
  let userView;
  return userData.signedUpAs === 'composer' ? <ComposerView userData={userData}/> : <FilmmakerView userData={userData}/>
}

export default SignedInView;