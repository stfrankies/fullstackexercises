import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {

  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/'>home</Link> 
      <Link style={padding} to="/new">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

export default Menu