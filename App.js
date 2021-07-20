import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [username, changeUsername] = useState("")
  const [password, changePassword] = useState("")
  const [currentUser, updateCurrentUser] = useState(undefined)

  const fetchUserInfo = () => {
    axios.get("https://insta.nextacademy.com/api/v1/users/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(resp => updateCurrentUser(resp.data))
  }

  const login = () => {
    axios.post("https://insta.nextacademy.com/api/v1/login", {username, password})
    .then((resp) => {
      changeUsername("")
      changePassword("")
      localStorage.setItem("token", resp.data.auth_token)
      fetchUserInfo()
    })
  }

  // visit page -> does browser have token? -> no -> login -> show user info
  //                          |-> yes -> show user info

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUserInfo()
    }
  }, [])

  const logOut = () => {
    localStorage.removeItem("token")
    updateCurrentUser(undefined)
  }

  if (currentUser) {
    return (
      <>
        <h1>{currentUser.email}</h1>
        <h1>{currentUser.username}</h1>
        <button onClick={logOut}>Log Out</button>
      </>
    )
  } else {
    return (
      <>
        <input type="text" placeholder="username" value={username} onChange={(e) => {changeUsername(e.target.value)}}/>
        <input type="text" placeholder="password" value={password} onChange={(e) => {changePassword(e.target.value)}}/>
        <button onClick={login}>Login</button>
      </>
    )
  }


}

export default App;