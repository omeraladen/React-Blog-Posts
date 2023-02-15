import { useContext, useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { Link,useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import api from '../api/posts';
import format from "date-fns/format";


const EditPost = () => {
  const {posts ,setPosts} = useContext(DataContext);
    const {id} = useParams();
    

    
    // use to update post with axios
    const [ editTitle , setEditTitle] = useState(''); 
    const [ editBody , setEditBody] = useState('');
    
    const navigate = useNavigate();
  //-------------------------------EditPost -> Update with axios--------------------------
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {id , title: editTitle, datetime, body: editBody};
  
    try{
      const response = await api.put(`/posts/${id}`,updatedPost);
      setPosts(posts.map(
        post => post.id === id ? {...response.data}: post));
      
      setEditBody('');  
      setEditTitle('');
      navigate('/');
  
    }catch (err){
        console.log(`Error ${err.message}`);
      }
  }
  //--------------------------------------------------------------------
    //------------------------------------------------------------------
    const post = posts.find(post => (post.id).toString() === id);
    useEffect(() => {
      if (post){
        setEditTitle(post.title);
        setEditBody(post.body);
      }
    }, [post , setEditBody, setEditTitle])
    //------------------------------------------------------------------
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