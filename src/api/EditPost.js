import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const EditPost = ({
    posts, handleEdit , editTitle , editBody , setEditTitle, setEditBody
}) => {
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
     if (post){
      setEditTitle(post.title);
      setEditBody(post.body);
     }
    }, [post , setEditBody, setEditTitle])
  return (
    <main className='NewPost'>
      {editTitle && 
      <>
        <h3>Edit Post</h3>
      <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>

          <label htmlFor="postTitle">Title:</label>
          <input 
            type="text" 
            id="postTitle" 
            required 
            value={editTitle}
            placeholder='Enter Post'
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <label htmlFor="PostBody">Post:</label>
          <textarea 
            placeholder='Description...'
            id="postBody" 
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            ></textarea>
  
          <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
      </form>
      </>
}
{!editTitle &&  <>
  <h2>Page Not Found !</h2>
     <p>Well, that's disappointing.</p>
     <p>
    <Link to='/'>Visit Our Homepage</Link>
   </p>
</>}
    </main>
  )
}

export default EditPost;