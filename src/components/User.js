import React from 'react'

const User = ({ user }) => {

    const pageUrl = `https://www.github.com/${user.name}`

   return (
     <div>
         <h3>Results:</h3>
         <a target="_blank" rel="noreferrer" href={pageUrl}>{user.name}</a>
         <br></br>
         {user.bio ? user.bio : null}
         <br></br>
    </div>
   )
}

export default User

