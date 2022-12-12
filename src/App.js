import './App.css';
import Layout from './Component/Layout';
import { Route, Routes  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './Component/Home';
import NewPost from './Component/Posts/NewPost';
import PostPage from './Component/Posts/PostPage';
import About from './Component/About';
import Missing from './Component/Missing';
import { useEffect , useState } from 'react';

function App() {
  const [posts , setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ]);

  const [search , setSearch] = useState('');
  const [searchResults , setSearchResults] = useState([]);
  const navigate = useNavigate();
  

  const handleDelete = (id) => {
    const postList = posts.filter(post => post.id !== id);
    setPosts(postList);
    navigate("/");
  }
  return (
    <Routes>
      <Route path='/' element={<Layout 
      search={search}
      setSearch={setSearch}
      />}>
        <Route index element={<Home posts={posts}/>}/>
        
        <Route path='post'>
          <Route index element={<NewPost/>}

          />
          <Route path=':id' element={<PostPage posts={posts} 
          handleDelete={handleDelete}/>}

          />
        </Route>

        <Route path='about' element={<About/>}/>
        <Route path='*' element={<Missing/>}/>
      </Route>
    </Routes>
  );
}

export default App;
