import React from 'react'

const NewPost = ({
  handleSubmit , postTitle, setPostTitle, postBody, setPostBody
}) => {
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
          onChange={(e) => setPostBody(e.target.value)}
          ></textarea>

        <button type='submit'>Submit</button>
     </form>
    </main>
  )
}

export default NewPost