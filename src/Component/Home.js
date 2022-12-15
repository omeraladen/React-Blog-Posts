import React from 'react'
import Feed from './Feed'

const Home = ({posts ,darkMode}) => {
  
  return (
    <main  className="Home" 
    style={darkMode ? { 
      backgroundColor: "gray",
      color:'#fff'
    } : null}
    
    >
        {posts.length ? (
            <Feed posts={posts} />
        ) : (
            <p style={{ marginTop: "2rem" }}>
                No posts to display.
            </p>
        )}
    </main>
  )
}

export default Home;