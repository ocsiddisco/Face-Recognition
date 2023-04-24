import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
        }}
      >
        <p
          onClick={() => onRouteChange('signout')}
          className="f3 link dim black underline pa3 pointer near-white"
        >
          Sign Out
        </p>
      </nav>
    )
  } else {
    return (
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
        }}
      >
        <p
          onClick={() => onRouteChange('signin')}
          className="f3 link dim black underline pa3 pointer near-white flex items-center"
        >
          Sign in
        </p>
        <p
          onClick={() => onRouteChange('register')}
          className="f3 link dim black underline pa3 pointer near-white flex items-center"
        >
          Register
        </p>
      </nav>
    )
  }
}

export default Navigation
