import React from 'react'

const Repo = ({ repo }) => {
    const renderDescription = () => repo.description === null ? 'No description specified' : repo.description
    const renderLanguage = () => repo.language === null ? 'No languages info specified' : repo.language
  
    return (
        <div className="container mx-auto mt-4">
            <div className="row">
                 <div className="col-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title font-weight-bold">{repo.name}</h5>
                            <p className="card-text">
                                Description: {renderDescription()}
                                <br></br>
                                Languages: {renderLanguage()}
                                <br></br>
                                Last update: {repo.updated_at} 
                            </p>
                            <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-light-blue ">View this repository</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Repo
