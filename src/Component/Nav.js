import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ search , setSearch }) => {
  return (
    <nav className='Nav'>
        <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
          
            <input 
                type="text" 
                placeholder='Search Posts'
                id="search" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
                <li> <Link to='/'>Home</Link></li>
                <li> <Link to='/post'>Post</Link></li>
                <li> <Link to='/about'>About</Link></li>
            </ul>
        </form>
    </nav>
  )
}

export default Nav