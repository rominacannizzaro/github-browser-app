import React from 'react'

const User = ({ user, repos }) => {
  const pageUrl = `https://www.github.com/${user.name}`
  const renderBio = () => user.bio === null ? 'No bio info specified.' : user.bio  
  const renderLocation = () => user.location === null ? 'No location specified.' : user.location
  const renderReposText = () => repos.length === 0 ? 'Repositories: No results. This user has not shared any repositories yet.' : 'Repositories found:'

  return (   
    <div>
        <h3>Results:</h3>
        <br></br>
        <img src={user.pic} alt="" height="150px" width="150px"></img>
        <br></br>
        <a target="_blank" rel="noreferrer" href={pageUrl}>{user.name}</a>
        <br></br>
        Bio: {renderBio()}
        <br></br>
        Location: {renderLocation()}
        <br></br>
        <br></br>
        <h4>{renderReposText()}</h4>
  </div>
  )
}

export default User