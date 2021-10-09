import React, { useState } from 'react'
import axios from 'axios'
import User from './components/User'


const App = () => {
  
const [ userInfo, setUserInfo ] = useState([])
const [newName, setNewName] = useState('')


const searchUser = (event) => {          
  event.preventDefault()  
  if (newName === '') {
    alert('Please, enter a username.')    
  }

  axios.get(`https://api.github.com/users/${newName}`)
    .then(response => {      
      const userObject = {
        name: response.data.login,
        bio: response.data.bio,
        repos: response.data.repos_url
      }

      setUserInfo([userObject]);
      setNewName('')
    })
    .catch(
      function (error) {
        alert('Invalid username.')
      }
    )
  }

const handleNewUser = (event) => {  
  setNewName(event.target.value)
}
  

return (
  <div>
    <h1>Romina's GitHub Browser App</h1>
    <br></br>
    <h2>Welcome to my GitHub browser app!</h2>
    <br></br>
    <h3>Please write the username of a GitHub user or organisation:</h3>
    <form onSubmit={searchUser}>
        <div>
          Name: <input 
          id="nameEntered"
          placeholder="Search"  
          value={newName}
          onChange={handleNewUser}
          />
        </div>
        <div>
        </div>
        <br></br>
        <button type="submit">Search</button>
    </form>
    <br></br>
    <div>
      <ul>
      {userInfo
        .map(user =>  
            <User key={user.name} user={user}  />
            )} 
      </ul>
    </div>
  </div>
  )
}

export default App