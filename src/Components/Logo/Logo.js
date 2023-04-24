import React from 'react'
import Tilt from 'react-parallax-tilt'
import './Logo.css'
import brain from './iconbrain.png'

const Logo = () => {
  return (
    <div>
      <Tilt
        className="Tilt br2 shadow-2 flex items-center justify-center"
        style={{ height: '150px', width: '150px' }}
      >
        <div className="Tilt-inner pa3 flex items-center">
          <img style={{ paddingTop: '23px' }} alt="logo" src={brain} />
        </div>
      </Tilt>
    </div>
  )
}

export default Logo
