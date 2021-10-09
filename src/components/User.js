import React from 'react'

const User = ({ user }) => {
    const userPageUrl = `https://www.github.com/${user.name}`
    /*const reposPageUrl = `https://www.github.com/${user.name}?tab=repositories`*/


   return (
     <div>
         <h3>Results:</h3>
         User: <a target="_blank" rel="noreferrer" href={userPageUrl}>{user.name}</a>
         <br></br>
    </div>
   )
}

export default User