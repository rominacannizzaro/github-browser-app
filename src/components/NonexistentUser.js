import React from 'react'

const NonexistentUser = ({ nonexistentUser }) => {
     if (nonexistentUser) {
         return (
            <div className="alert alert-danger text-align: left" role="alert">
                 Error: This username does not exist.
            </div>
        )
    } else {
        return null
    }
}

export default NonexistentUser

 