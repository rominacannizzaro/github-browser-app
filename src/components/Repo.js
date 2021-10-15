import React from 'react'

const Repo = ({ repo }) => {
    const renderDescription = () => repo.description === null ? 'No description specified' : repo.description
    const renderLanguage = () => repo.language === null ? 'No languages info specified' : repo.language
  
    return (
        <div>
            <h4>{repo.name}</h4>
            Description: {renderDescription()}
            <br></br>
            Languages: {renderLanguage()}
            <br></br>
            Last update: {repo.updated_at} 
            <br></br>
            <a href={repo.html_url} target="_blank" rel="noreferrer">View this repository</a>
        </div>
    )
}

export default Repo
