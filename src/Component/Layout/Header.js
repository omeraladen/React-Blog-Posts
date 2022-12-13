import Logo from '../Layout/blog.png'
import { Link } from 'react-router-dom'

const Header = ({ title }) => {
  const logoStyle = {
    width:'40px',

  }
  return (
    <div className='Header'>
        <h1>
           <Link to='/'>
             <img style={logoStyle} src={Logo} alt="" />|{title}
           </Link>
        </h1>
    </div>
  )
}

export default Header