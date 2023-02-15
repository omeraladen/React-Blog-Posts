import { useContext } from "react"
import { useParams, Link , useNavigate} from "react-router-dom"
import DataContext from "../../context/DataContext"
import api from '../../api/posts';


const PostPage = () => {
  
  const navigate = useNavigate();
  const {   posts, setPosts , darkMode } = useContext(DataContext);


  //-------------------------------Delete Post--------------------------
  const handleDelete = async (id) => {
    try{
      await api.delete(`/posts/${id}`);
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList);
      navigate("/");

    } catch (err){
      console.log(`Error ${err.message}`)

    }
  }

  const StyleEditBtn = {
    marginRight:'.5rem' ,
    backgroundColor: 'rgb(19, 79, 114)',
  }
  
  const {id} = useParams()
  const post = posts.find(post => (post.id).toString() === id);
//--------------------------------------------------------------------

  return (
    <main className="PostPage"  style={darkMode ? { 
      backgroundColor: "gray",
      color:'#fff'
    } : null}
    >
       <article className="post">

        {post && 
          <>
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
            <p>{post.body}</p>
            {/* linked with EditPost Component */}
            <Link to={`/edit/${post.id}`}>
              <button style={StyleEditBtn} >Edit Post</button>
            </Link>
            <button
            onClick={() => handleDelete(post.id)}
            >Delete Post</button>
          </>
        }

        {!post && 
          <>
          <h2>Post Not Found!</h2>
          <p>Well that's disappointing.</p>
          <p>
            <Link to='/'>Visit Our Homepage</Link>
          </p>
          </>

        }
       </article>
    </main>
  )
}

export default PostPage