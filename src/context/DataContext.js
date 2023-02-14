import { createContext ,useState , useEffect } from "react";

import format from 'date-fns/format'; // npm i date-fns -s
import { useNavigate } from 'react-router-dom';
import api from '../api/posts';
import useDarkMode from "../hooks/useDarkMode";
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [posts , setPosts] = useState([]);
  
    const [search, setSearch] = useState('');
    const [searchResults , setSearchResults] = useState([]);
  
    const [postTitle , setPostTitle] = useState('');
    const [postBody , setPostBody] = useState('');
    
    // use to update post with axios
    const [ editTitle , setEditTitle] = useState(''); 
    const [ editBody , setEditBody] = useState('');
    
    const navigate = useNavigate();
  
    // Custom Hooks
    const [darkMode , toggleDarkMode ] = useDarkMode();
    const {data, fetchError , isLoading} = useAxiosFetch('http://localhost:3500/posts');
  
  //------------------fetch data with axios with cusom Hook--------------------------
  useEffect(() => {
    setPosts(data);
  }, [data])
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
        <DataContext.Provider value={{
             darkMode , toggleDarkMode , search , setSearch , // <LayOut/>
             searchResults , fetchError , isLoading ,   // <Home/>
             handleSubmit , postTitle, setPostTitle, postBody, setPostBody, //<NewPost/>
             posts, handleEdit , editTitle , editBody , setEditTitle, setEditBody, // <EditPost/>
             handleDelete, // PostPage
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;