import React, { useState } from 'react'
import axios from 'axios'
import User from './components/User'
import Repo from './components/Repo'
import NonexistentUser from './components/NonexistentUser'
import UsernameValidationError from './components/UsernameValidationError'
import githubUsernameRegex from 'github-username-regex'

const App = () => {
  const [ userInfo, setUserInfo ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ nonexistentUser, setNonexistentUser ] = useState(false)
  const [ isUsernameValidationError , setIsUsernameValidationError] = useState(true)
  const [ repos, setRepos ] = useState([])

  const searchUser = (event) => {
    event.preventDefault()  

    if (newName === '') {
      alert('Please, enter a username.')    
    }

  const userPromise = axios.get(`https://api.github.com/users/${newName}`)
  .then(response => {
    const userObject = {
      id: response.data.id,
      name: response.data.login,
      bio: response.data.bio,
      type: response.data.type,
      reposUrl: response.data.repos_url,
      pic: response.data.avatar_url,
      location: response.data.location
    }
    setUserInfo([userObject])
    setNewName('')
    })

  const reposPromise = axios.get(`https://api.github.com/users/${newName}/repos`)
    .then(response => {
      const arrayOfRepos = response.data
      setRepos(arrayOfRepos)
    })

  Promise.all([userPromise, reposPromise])
    .then((values) => {
    console.log(values)
    setNonexistentUser(false)
  })
    .catch(error => {
    console.log(`ERROR IS ${error.message}`)
    if (error.message.includes('404')) {
      setNonexistentUser(true)
    }
  })
}

  const isValidUsername = (username) => {
    return githubUsernameRegex.test(username); 
  }

  const handleNewUser = (event) => {  
    const nameValue = event.target.value
    setNewName(nameValue)
    setIsUsernameValidationError(isValidUsername(nameValue))
  }

return (
  <div>
    <h1>Romina's GitHub Browser App</h1>
    <br></br>
    <h2>Welcome to my GitHub browser app!</h2>
    <br></br>
    <h3>Please, enter a GitHub user's or organisation's name:</h3>
    <form onSubmit={searchUser}>
        <div>
          Name: <input 
          id="nameEntered"
          placeholder="Search"  
          value={newName}
          onChange={handleNewUser}
          />
        </div>
        <br></br>
        <button type="submit">Search</button>
    </form>
    <br></br>
    <div>
      <UsernameValidationError isError={isUsernameValidationError} />
    </div>
    <div>
      <NonexistentUser nonexistentUser={nonexistentUser} />
    </div>
    <div>
      <ul>
        {userInfo
          .filter(item => item.name.toLowerCase())
          .map(user =>  
            <User key={user.id} user={user} repos={repos}  />
        )} 
       </ul>
    </div>
    <div>
    {repos.length === 0 
      ? null 
      : <p>Results:</p>
    }
      <ul>
          {repos.map(repo => 
              <Repo key={repo.id} repo={repo} />
          )}
        </ul>
    </div>
  </div>
  )
}

export default App

