import React from 'react'

const NonexistentUser = ({ nonexistentUser }) => {
     if (nonexistentUser) {
         return (
            <div>
                 Error: This username does not exist.
            </div>
        )
    } else {
        return null
    }
}

export default NonexistentUser

 