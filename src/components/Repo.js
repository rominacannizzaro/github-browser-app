import React from 'react'

const Repo = ({repo}) => {
    const languageInfo = `${repo.language}`
    const renderLanguage = () => languageInfo === 'null' ? 'No languages info specified' : languageInfo

    const descriptionInfo = `${repo.description}`
    const renderDescription = () => descriptionInfo === 'null' ? 'No description specified' : descriptionInfo

    const licenceInfo = `${repo.licence}`
    const renderLicence = () => licenceInfo === 'undefined' ? 'No licence specified' : licenceInfo

    return (
        <div>   
            <li>         
                Name: <a target="_blank" rel="noreferrer" href={repo.html_url}>{repo.name}</a>  
                <br></br>
                Last update: {repo.updated_at} 
                <br></br>
                Language: {renderLanguage()}
                <br></br>
                Description: {renderDescription()} 
                <br></br>
                Licence: {renderLicence()} 
                <br></br>
            </li>
        </div>
   )
}

export default Repo
