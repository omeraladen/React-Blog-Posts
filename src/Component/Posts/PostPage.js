import { useParams, Link } from "react-router-dom"

const PostPage = ({posts , handleDelete , darkMode}) => {
  
  const StyleEditBtn = {
    marginRight:'.5rem' ,
    backgroundColor: 'rgb(19, 79, 114)',
  }
  
  const {id} = useParams()
  const post = posts.find(post => (post.id).toString() === id);
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