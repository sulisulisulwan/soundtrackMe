/* eslint-disable react/prop-types */
import React from 'react';
import SignInArea from './SignInArea.jsx'

const Header = ({changePageState, pageState}) => {
  return (
    <header>
      <div id="navbar">
        <SignInArea
          changePageState={changePageState}
          pageState={pageState}
        />
      </div>
    </header>
  );
}

export default Header;