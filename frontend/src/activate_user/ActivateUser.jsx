import React from 'react';
import ReactDom from 'react-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ActivateUser = () => {

  const [activateState, setActivateState] = useState('');

  const handleRedirect = async () => {
    axios.put()
  }

  useEffect(() => {
    if (activateState === 'activated') {
      try {
        handleRedirect
      } catch(err) {
        setActivateState('manualRedirect')
      }
    }

  }, [activateState]
  )

  return (
    <>
      { activateState === 'manualRedirect' ?
        <p>
          Click <a href="/">this link</a> if not redirected;
        </p>
          :
          null
    }
    </>
  )
}

ReactDom.render(<ActivateUser/>, document.getElementById('activate-user'))