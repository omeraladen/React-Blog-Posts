import Logo from '../Layout/blog.png';
import { Link } from 'react-router-dom';
import {MdDarkMode} from 'react-icons/md';
import {  BsLightbulb} from 'react-icons/bs';


const Header = ({ title ,toggleDarkMode , darkMode }) => {
  const logoStyle = {
    width:'40px',
    
  }
  const toggleBtn = {
    border:'none',
    backgroundColor:'#66d8f5',
    cursor: 'pointer'
  }

  
  return (
    <div className='Header' >
        <h1>
           <Link to='/'>
             <img style={logoStyle} src={Logo} alt="" />|{title}
           </Link>
        </h1>
       
       
      <button onClick={() => toggleDarkMode()} style={toggleBtn}>
        { darkMode ?   
        <BsLightbulb style={{
          width:'2rem'
          }}/> : 
        
        <MdDarkMode style={{
          width:'2rem'
          }}/>}
      </button>
    </div>
  )
}

export default Header