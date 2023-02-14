import './app.css'
import Layout from './Component/Layout/Layout';
import Home from './Component/Home';
import NewPost from './Component/Posts/NewPost';
import EditPost from './api/EditPost';
import PostPage from './Component/Posts/PostPage';
import About from './Component/About';
import Missing from './Component/Missing';

import { Route, Routes  } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

function App() {

  return (
  <div className='App'>
     <DataProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='post'>
            <Route index element={<NewPost />} /> 
            <Route path=':id' element={<PostPage />} />
          </Route>
            <Route path='/edit/:id' element={<EditPost  />} />
            <Route path='about' element={<About/>}/>
            <Route path='*' element={<Missing/>}/>
        </Route>
      </Routes>
    </DataProvider>
  </div>
  );
}

export default App;
