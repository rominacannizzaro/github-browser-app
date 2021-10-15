import React, { useState } from 'react'
import axios from 'axios'
import User from './components/User'
import Repo from './components/Repo'
import NonexistentUser from './components/NonexistentUser'
import UsernameValidationError from './components/UsernameValidationError'
import githubUsernameRegex from 'github-username-regex'
import logo from './images/gh-logo.png'

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
  integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
  crossorigin="anonymous"
/>

const App = () => {
  const [ userInfo, setUserInfo ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ repos, setRepos ] = useState([])
  const [ nonexistentUser, setNonexistentUser ] = useState(false)
  const [ isUsernameValid, setIsUsernameValid ] = useState(true)

  const searchUser = (event) => {
    event.preventDefault()
    setNonexistentUser(false)    

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

  const handleUsernameChange = (event) => {  
    const nameValue = event.target.value
    setNewName(nameValue)
    setIsUsernameValid(isValidUsername(nameValue))
    setNonexistentUser(false)
    if (nameValue.length === 0) {
      console.log('Setting USER NAME VALIDATION error to false')
      setIsUsernameValid(true)
    }
  }

  const searchInputStyle = {
    marginLeft: 15,
  }

  const searchButtonStyle = {
    marginLeft: 20,
  }

  return (
    <div className="container-fluid" >
  
      {/* Header */}
      <header className="header-default">
        <div className="row flex-wrap flex-start align-items-center bg-dark">
          <div className="col-4 pt-1">
            <img width="40%" src={logo} alt="gh-logo"></img>
          </div>
          <div className="col-4 text-center">
            <h1 className="text-white font-weight-bold">ROMINA'S GITHUB BROWSER</h1>
          </div>
          </div>
      </header>
      <br></br>
      <br></br>
  
      {/* Row with jumbotron */}
        <div className="row">
          <div className="col-12">
            <div className="jumbotron p-3 p-md-5 rounded" background-size="cover">
              <div className="col-12" background-color="alert">
                <h1 className="display-5 text-dark-blue font-weight-bold">Hello, World!</h1>
                <p className="lead text-light-blue font-weight-bold">Welcome to my GitHub browser application</p> 
                <p className="lead text-light-blue">By entering a GitHub username, you'll be able to check out their basic information and available repositories to show. Let's get started! </p> 
                <p className="lead mb-0"><a href="https://github.com/rominacannizzaro/"  target="_blank" rel="noreferrer" className="text-light-blue font-weight-bold">More about my skills and projects</a></p>
              </div>
            </div>
          </div>
        </div>  
  
      {/* Row with form */}
  
      <div className="row">
         <div className="col-12">
           <form className="form-inline" onSubmit={searchUser}>
              <div className="form-group mx-sm-3 mb-2">
                <label>Please enter a username:</label>
                <input
                  style={searchInputStyle}
                  type="text" 
                  id="nameEntered" 
                  aria-describedby="searchArea" 
                  placeholder="Search"  
                  value={newName} 
                  onChange={handleUsernameChange}
                >  
                </input>
                <button type="submit" className="btn btn-primary mb-2" style={searchButtonStyle}>Search</button>
              </div>
            </form>
            <div className="col-auto">
               <UsernameValidationError isUsernameValid={isUsernameValid} />
            </div>
            <div className="col-auto">
               <NonexistentUser nonexistentUser={nonexistentUser} />
            </div>
          </div>
        </div> 
  
      {/* Row with results of user found */}
       <div className="row">
        <div className="col-4" >
          <ul>
            {userInfo
              .filter(item => item.name.toLowerCase())
              .map(user =>  
                <User key={user.id} user={user} repos={repos}  />
            )} 
          </ul>
        </div>
       </div> 
  
      {/* Row with cards */ }
      <div className="row align-items-right">
        <div className="col-6 col-md-6">
          <ul>
            {repos.map(repo => 
              <Repo key={repo.id} repo={repo} />
             )}
          </ul>
        </div>
      </div>

  </div>    
  )
}

export default App
