import React from 'react'
import { Link } from 'react-router-dom'
import './styles/header.css'

const Header = () => {
  return (    
      <h1>
        <Link to={{pathname: '/' }}>
        Noteful
        </Link>
      </h1>
  )
}

export default Header