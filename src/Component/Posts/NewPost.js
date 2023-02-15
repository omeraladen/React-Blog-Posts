import React, { useContext , useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import format from 'date-fns/format';
import api from '../../api/posts'


const NewPost = () => {
  const {posts , setPosts} = useContext(DataContext);

  const [postTitle , setPostTitle] = useState('');
  const [postBody , setPostBody] = useState('');
  const navigate = useNavigate();

    //----------------------------Add Post Logic and POST--------------------------
   //callback from a form in newPost component
   const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length -1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {
      id , title:postTitle, datetime, body: postBody};
      try{
        const response = await api.post('/posts', newPost);
        
        const allPosts = [...posts, response.data];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        navigate("/");
      } catch (err) {
        console.log(`Error ${err.message}`)
      }
  }

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