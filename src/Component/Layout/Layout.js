import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Nav from "./Nav"



const Layout = ({ search , setSearch,toggleDarkMode ,darkMode }) => {
  return (
    <div className="App">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} title=' Blog'/>
        <Nav setSearch={setSearch} search={search}/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout