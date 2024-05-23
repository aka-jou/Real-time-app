import React from 'react'
import  "./Nav.css"
import image from "../../../assets/img/cuevana3.png"
function Nav() {
  return (
    <div className='divNav'>
      <div className='divImageNav'>
      <img src={image}alt="" />
      </div>
    </div>
  )
}

export default Nav;