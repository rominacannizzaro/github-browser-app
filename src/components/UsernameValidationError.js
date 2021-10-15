import React from 'react'

const UsernameValidationError = ({ isUsernameValid }) => {
    if (!isUsernameValid) {
        return (
            <div className="alert alert-danger text-align: left" role="alert">
                Invalid username. Github username may only contain alphanumeric characters or hyphens, cannot have multiple consecutive hyphens, and must have a maximum length of 39 characters.
            </div>
        )
    } else {
        return null
    }
}

export default UsernameValidationError

 