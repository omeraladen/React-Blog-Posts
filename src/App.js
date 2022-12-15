import './app.css'
import Layout from './Component/Layout/Layout';
import Home from './Component/Home';
import NewPost from './Component/Posts/NewPost';
import PostPage from './Component/Posts/PostPage';
import About from './Component/About';
import Missing from './Component/Missing';
import format from 'date-fns/format'; // npm i date-fns -s
import { useEffect , useState } from 'react';
import { Route, Routes ,useNavigate } from 'react-router-dom';
import api from './api/posts';
import EditPost from './api/EditPost';
import useDarkMode from './hooks/useDarkMode';


function App() {
  const [posts , setPosts] = useState([]);
  
  const [search, setSearch] = useState('');
  const [searchResults , setSearchResults] = useState([]);

  const [postTitle , setPostTitle] = useState('');
  const [postBody , setPostBody] = useState('');
  
  // use to update post with axios
  const [ editTitle , setEditTitle] = useState(''); 
  const [ editBody , setEditBody] = useState('');
  
  const navigate = useNavigate();
  const [darkMode , toggleDarkMode ] = useDarkMode();

//----------------------------fetch GET posts useing axios--------------------------
useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range 
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }

  fetchPosts();
}, [])


//----------------------------Searcg Results--------------------------

useEffect(() => {
  const filteredResults = posts.filter((post) =>
    ((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase()));

  setSearchResults(filteredResults.reverse());
}, [posts, search])
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

//-------------------------------Edit -> Update with axios--------------------------

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
//------------------------------------------------------------------

  return (
  <div >
     
     <Routes>
      <Route path="/" element={<Layout 
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      search={search}
      setSearch={setSearch}
      
      />}>

        <Route index element={<Home  
        darkMode={darkMode}
        posts={searchResults} />} 
        />
        
        <Route path='post'>

          <Route index element={<NewPost 
            handleSubmit={handleSubmit}
            postBody={postBody}
            setPostBody={setPostBody}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            />} />
          
            <Route path=':id' element={<PostPage darkMode={darkMode} posts={posts} 
            handleDelete={handleDelete}/>} />

        </Route>

            <Route 
              path='/edit/:id' element={<EditPost 
                posts={posts}
                handleEdit={handleEdit}
                editTitle={editTitle}
                editBody={editBody}  
                setEditTitle={setEditTitle} 
                setEditBody={setEditBody}
                />} />

        <Route path='about' element={<About/>}/>
        <Route path='*' element={<Missing/>}/>
      </Route>
    </Routes>

  </div>
  );
}

export default App;
