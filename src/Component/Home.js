import React from 'react'
import Feed from './Feed'

const Home = ({ posts ,darkMode , fetchError , isLoading }) => {
  
  return (
    <main  className="Home" 
    style={darkMode ? { 
      backgroundColor: "gray",
      color:'#fff'
    } : null}
    >

      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {!isLoading && fetchError && 
      <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
      
      {!isLoading && !fetchError && (posts.length ?
         <Feed posts={posts} /> : 
         <p className="statusMsg">No posts to display.</p>)}
    
    </main>
  )
}

export default Home;