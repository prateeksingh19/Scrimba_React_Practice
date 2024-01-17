import { useState } from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import MainContent from './Components/MainContent'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <MainContent/>
    </>
  )
}

export default App