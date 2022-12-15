import {useState,useEffect} from 'react'

export default function useDarkMode ()  {
  const [darkMode , setDarkMode] = useState(
    localStorage.getItem('them') === 'dark' ? true : false);
    

    useEffect(() => {
      if(darkMode){
        document.body.classList.add('dark-mode');
        localStorage.setItem('them','dark');
      }else{
        document.body.classList.remove('dark-mode');
        localStorage.setItem('them','light');

      }
    },[darkMode])

    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    }

    // the outSide of this Custom Hook is
    return [darkMode , toggleDarkMode];
}