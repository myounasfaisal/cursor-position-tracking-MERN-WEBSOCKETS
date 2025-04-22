import React, { useState } from 'react'

function Login({onSubmit}) {
const [username,setUsername]=useState("");

  return (
    <>
    <h1>Welcome</h1>
    <p>What should people call me ???</p>
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit(username)}} >
    <input type="text" placeholder='Input Username' onChange={(e)=>{setUsername(e.target.value)}} />
    <input type="submit" value="Submit" />
    </form>
    </>
  )
}

export default Login