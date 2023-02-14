import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Nav from "./Nav"
import { useContext } from "react"
import DataContext from "../../context/DataContext"


const Layout = () => {
const { toggleDarkMode ,darkMode } = useContext(DataContext);
  return (
    <div className="App">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} title=' Blog'/>
        <Nav />
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout