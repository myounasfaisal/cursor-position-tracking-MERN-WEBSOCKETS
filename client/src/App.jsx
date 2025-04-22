import { useState } from 'react'
import './App.css'
import Login from './components/login/Login'
import Home from './components/home/Home'

function App() {
  const [username, setUsername] = useState("");

  return !username ? (
    <>
     <Login onSubmit={setUsername}/>
    </>
  ) :(
    <Home username={username} />
  )
}

export default App
