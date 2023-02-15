import Logo from '../Layout/blog.png';
import { Link } from 'react-router-dom';
import {MdDarkMode} from 'react-icons/md';
import {  BsLightbulb} from 'react-icons/bs';

import { useContext } from 'react';
import DataContext from '../../context/DataContext';

const Header = ({ title  }) => {
  const { darkMode , toggleDarkMode } = useContext(DataContext);
  const logoStyle = {
    width:'40px',
    
  }
  const toggleBtn = {
    border:'none',
    backgroundColor:'#66d8f5',
    cursor: 'pointer'
  }

  
  return (
    <div className='Header'  style={darkMode ? { 
      backgroundColor: "gray",
      color:'#fff'
    } : null}>
        <h1>
           <Link to='/'>
             <img style={logoStyle} src={Logo} alt="" />|{title}
           </Link>
        </h1>
       
       {/* DarkMode Btn */}
      <button onClick={() => toggleDarkMode()} style={toggleBtn}>
        { darkMode ?   
        <BsLightbulb style={{
          width:'1.5rem',
          backgroundColor:'gray'
          }}/> : 
        
        <MdDarkMode style={{
          width:'1.6rem'
          }}/>}
      </button>
    </div>
  )
}

export default Header