import { createContext ,useState , useEffect } from "react";

import useDarkMode from "../hooks/useDarkMode";
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [posts , setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults , setSearchResults] = useState([]);
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
 

    return (
        <DataContext.Provider value={{
             darkMode , toggleDarkMode , search , setSearch , // <LayOut/>
             searchResults , fetchError , isLoading ,   // <Home/>
             posts, setPosts // <EditPost/>
        }}>
            {children} 
        </DataContext.Provider>
    )
}

export default DataContext;