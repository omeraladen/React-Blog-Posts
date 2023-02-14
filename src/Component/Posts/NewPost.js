import React, { useContext } from 'react'
import DataContext from '../../context/DataContext'

const NewPost = () => {
  const {handleSubmit , postTitle, setPostTitle, postBody, setPostBody,} = useContext(DataContext);
  return (
    <main className='NewPost'>
      <h3>New Post</h3>
     <form className='newPostForm' onSubmit={handleSubmit}>

        <label htmlFor="postTitle">Title:</label>
        <input 
          type="text" 
          id="postTitle" 
          required
          value={postTitle}
          placeholder='Enter Post'
          onChange={(e) => setPostTitle(e.target.value)}
        />

        <label htmlFor="PostBody">Post:</label>
        <textarea 
          placeholder='Description...'
          id="postBody" 
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}>
        </textarea>

        <button type='submit'>Submit</button>
     </form>
    </main>
  )
}

export default NewPost